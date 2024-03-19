import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenRepository } from '@src/apis/auth/token/repositories/token.repository';
import jwtConfig from '@src/core/config/jwt.config';
import { Token } from '@src/entities/Token';

@Injectable()
export class TokenService {
  constructor(
    private readonly tokenRepository: TokenRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly config: ConfigType<typeof jwtConfig>,
  ) {}

  createToken(
    userId: number,
    accessToken: string,
    refreshToken: string,
  ): Promise<Token> {
    return this.tokenRepository.save({
      userId,
      accessToken,
      refreshToken,
    });
  }

  generateAccessToken(userId: number): string {
    return this.jwtService.sign({ id: userId });
  }

  generateRefreshToken(userId: number): string {
    return this.jwtService.sign(
      { id: userId },
      { secret: this.config.jwtRefreshTokenSecret },
    );
  }
}
