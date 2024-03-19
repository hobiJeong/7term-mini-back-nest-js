import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtModuleOptionsFactory } from '@src/apis/auth/jwt/factories/jwt-module-options.factory';
import { TokenRepository } from '@src/apis/auth/token/repositories/token.repository';
import { TokenService } from '@src/apis/auth/token/services/token.service';
import { TypeOrmExModule } from '@src/core/type-orm/type-orm-ex.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtModuleOptionsFactory,
    }),
    TypeOrmExModule.forCustomRepository([TokenRepository]),
  ],
  providers: [TokenService, JwtModuleOptionsFactory],
  exports: [TokenService],
})
export class TokenModule {}
