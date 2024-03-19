import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import dbConfig from '@src/core/config/db.config';

@Injectable()
export class TypeOrmModuleOptionsFactory implements TypeOrmOptionsFactory {
  constructor(
    @Inject(dbConfig.KEY)
    private readonly config: ConfigType<typeof dbConfig>,
  ) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.config.host,
      username: this.config.user,
      password: this.config.password,
      database: this.config.name,
      port: this.config.port,
      entities: ['dist/**/entities/*{.ts,.js}'],
      logging: true,
    };
  }
}
