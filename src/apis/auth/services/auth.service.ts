import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SignInResponseDto } from '@src/apis/auth/dto/sign-in-response.dto';
import { SignInRequestBodyDto } from '@src/apis/auth/dto/sign-in-request-body.dto';
import { TokenService } from '@src/apis/auth/token/services/token.service';
import { UsersService } from '@src/apis/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async signIn(
    signInRequestBodyDto: SignInRequestBodyDto,
  ): Promise<SignInResponseDto> {
    const { loginId, password } = signInRequestBodyDto;

    const existUser = await this.usersService.findOne({
      where: {
        loginId,
        password,
      },
    });

    if (!existUser) {
      throw new NotFoundException('Account not found.');
    }

    const accessToken = this.tokenService.generateAccessToken(existUser.id);
    const refreshToken = this.tokenService.generateRefreshToken(existUser.id);

    await this.tokenService.createToken(
      existUser.id,
      accessToken,
      refreshToken,
    );

    return new SignInResponseDto({
      accessToken,
      refreshToken,
    });
  }

  generateAccessToken(userId: number): string {
    return this.tokenService.generateAccessToken(userId);
  }

  async signOut(userId: number): Promise<number> {
    const existUser = await this.usersService.findOneOrNotFound(userId);

    const deleteResult = await this.tokenService.deleteToken(existUser.id);

    if (!deleteResult.affected) {
      throw new InternalServerErrorException(
        'Server error occurred during sign out',
      );
    }

    return deleteResult.affected;
  }
}
