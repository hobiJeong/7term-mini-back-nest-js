import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Payload } from '@src/apis/auth/constants/payload.interface';
import { SignInResponseDto } from '@src/apis/auth/dto/sign-in-response.dto';
import { SignInRequestBodyDto } from '@src/apis/auth/dto/sign-in-request-body.dto';
import { JwtRefreshTokenGuard } from '@src/apis/auth/jwt/guards/jwt-refresh-token.guard';
import { AuthService } from '@src/apis/auth/services/auth.service';
import { ApiGenerateAccessToken } from '@src/apis/auth/swagger-decorators/api-generate-access-token.swagger';
import { ApiSignIn } from '@src/apis/auth/swagger-decorators/api-sign-in.swagger';
import { RESPONSE_KEY } from '@src/common/constants/response-key.enum';
import { User } from '@src/common/decorators/user.decorator';
import { SetResponse } from '@src/interceptors/response-transformer-interceptor/decorators/set-response.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiSignIn('로그인 API')
  @Post('sign-in')
  @SetResponse(RESPONSE_KEY.TOKEN)
  signIn(
    @Body() signInRequestBodyDto: SignInRequestBodyDto,
  ): Promise<SignInResponseDto> {
    return this.authService.signIn(signInRequestBodyDto);
  }

  @ApiGenerateAccessToken('액세스 토큰 재발급 API')
  @Post('access-token')
  @SetResponse(RESPONSE_KEY.ACCESS_TOKEN)
  @UseGuards(JwtRefreshTokenGuard)
  generateAccessToken(@User() user: Payload): string {
    return this.authService.generateAccessToken(user.id);
  }
}
