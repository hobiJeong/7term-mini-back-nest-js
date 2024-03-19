import { Module } from '@nestjs/common';
import { BoardCommentsController } from './controllers/board-comments.controller';
import { BoardCommentsService } from './services/board-comments.service';

@Module({
  controllers: [BoardCommentsController],
  providers: [BoardCommentsService],
})
export class BoardCommentsModule {}
