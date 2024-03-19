import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { TypeOrmExModule } from '@src/core/type-orm/type-orm-ex.module';
import { UserRepository } from '@src/apis/users/repositories/user.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserRepository])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
