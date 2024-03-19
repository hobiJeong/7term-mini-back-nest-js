import { Module } from '@nestjs/common';
import { BoardCommentsController } from './controllers/board-comments.controller';
import { BoardCommentsService } from './services/board-comments.service';
import { BoardsModule } from '@src/apis/boards/boards.module';
import { TypeOrmExModule } from '@src/core/type-orm/type-orm-ex.module';
import { BoardCommentRepository } from '@src/apis/board-comments/repositories/board-comment.repository';
import { HelpersModule } from '@src/helpers/helpers.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([BoardCommentRepository]),
    BoardsModule,
    HelpersModule,
  ],
  controllers: [BoardCommentsController],
  providers: [BoardCommentsService],
})
export class BoardCommentsModule {}
