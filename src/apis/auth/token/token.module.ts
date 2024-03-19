import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtModuleOptionsFactory } from '@src/apis/auth/jwt/factories/jwt-module-options.factory';
import { JwtAccessTokenStrategy } from '@src/apis/auth/jwt/strategies/jwt-access-token.strategy';
import { JwtRefreshTokenStrategy } from '@src/apis/auth/jwt/strategies/jwt-refresh-token.strategy';
import { TokenRepository } from '@src/apis/auth/token/repositories/token.repository';
import { TokenService } from '@src/apis/auth/token/services/token.service';
import { UsersModule } from '@src/apis/users/users.module';
import { TypeOrmExModule } from '@src/core/type-orm/type-orm-ex.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtModuleOptionsFactory,
    }),
    PassportModule,
    TypeOrmExModule.forCustomRepository([TokenRepository]),
    UsersModule,
  ],
  providers: [
    TokenService,
    JwtModuleOptionsFactory,
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
  ],
  exports: [TokenService],
})
export class TokenModule {}
