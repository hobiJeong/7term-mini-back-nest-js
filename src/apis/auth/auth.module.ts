import { Module } from '@nestjs/common';
import { AuthController } from '@src/apis/auth/controllers/auth.controller';
import { AuthService } from '@src/apis/auth/services/auth.service';
import { TokenModule } from '@src/apis/auth/token/token.module';
import { UsersModule } from '@src/apis/users/users.module';

@Module({
  imports: [UsersModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
