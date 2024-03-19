import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenRepository } from '@src/apis/auth/token/repositories/token.repository';
import jwtConfig from '@src/core/config/jwt.config';
import { DeleteResult, InsertResult } from 'typeorm';

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
  ): Promise<InsertResult> {
    return this.tokenRepository.upsert(
      {
        userId,
        accessToken,
        refreshToken,
      },
      ['userId'],
    );
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

  deleteToken(userId: number): Promise<DeleteResult> {
    return this.tokenRepository.delete({ userId });
  }
}
