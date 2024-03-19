import { Module } from '@nestjs/common';
import { BoardLovesService } from './services/board-loves.service';
import { BoardLovesController } from './controllers/board-loves.controller';
import { BoardsModule } from '@src/apis/boards/boards.module';

@Module({
  imports: [BoardsModule],
  providers: [BoardLovesService],
  controllers: [BoardLovesController],
})
export class BoardLovesModule {}
