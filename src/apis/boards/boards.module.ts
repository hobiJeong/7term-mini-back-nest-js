import { Module } from '@nestjs/common';
import { BoardsController } from '@src/apis/boards/controllers/boards.controller';
import { BoardRepository } from '@src/apis/boards/repositories/board.repository';
import { BoardsService } from '@src/apis/boards/services/boards.service';
import { CategoriesModule } from '@src/apis/categories/categories.module';
import { TypeOrmExModule } from '@src/core/type-orm/type-orm-ex.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([BoardRepository]),
    CategoriesModule,
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
