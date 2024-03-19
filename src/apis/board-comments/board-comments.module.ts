import { Module } from '@nestjs/common';
import { BoardCommentsController } from './controllers/board-comments.controller';
import { BoardCommentsService } from './services/board-comments.service';
import { BoardsModule } from '@src/apis/boards/boards.module';
import { TypeOrmExModule } from '@src/core/type-orm/type-orm-ex.module';
import { BoardRepository } from '@src/apis/boards/repositories/board.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([BoardRepository]),
    BoardsModule,
  ],
  controllers: [BoardCommentsController],
  providers: [BoardCommentsService],
})
export class BoardCommentsModule {}
