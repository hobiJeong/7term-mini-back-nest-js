import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';
import jwtConfig from '@src/core/config/jwt.config';

@Injectable()
export class JwtModuleOptionsFactory implements JwtOptionsFactory {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly config: ConfigType<typeof jwtConfig>,
  ) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.config.jwtAccessTokenSecret,
    };
  }
}
