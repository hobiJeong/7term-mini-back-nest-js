import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from '@src/core/config/db.config';
import jwtConfig from '@src/core/config/jwt.config';
import serverConfig from '@src/core/config/server.config';
import { TypeOrmModuleOptionsFactory } from '@src/core/type-orm/type-orm-module-options.factory';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.development', '.env.production'],
      load: [dbConfig, jwtConfig, serverConfig],
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        NODE_ENV: Joi.string().required(),

        DB_HOST: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_PORT: Joi.number().required(),

        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmModuleOptionsFactory }),
  ],
})
export class CoreModule {}
