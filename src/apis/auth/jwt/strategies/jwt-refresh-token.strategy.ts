import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Payload } from '@src/apis/auth/constants/payload.interface';
import { UsersService } from '@src/apis/users/services/users.service';
import jwtConfig from '@src/core/config/jwt.config';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly config: ConfigType<typeof jwtConfig>,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwtRefreshTokenSecret,
    });
  }

  async validate(payload: Payload) {
    const existUser = await this.usersService.findOne({
      where: { id: payload.id },
    });

    if (!existUser) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }

    return existUser;
  }
}
