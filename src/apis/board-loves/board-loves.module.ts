import { Module } from '@nestjs/common';
import { BoardLovesService } from './services/board-loves.service';
import { BoardLovesController } from './controllers/board-loves.controller';
import { BoardsModule } from '@src/apis/boards/boards.module';
import { TypeOrmExModule } from '@src/core/type-orm/type-orm-ex.module';
import { BoardLoveRepository } from '@src/apis/board-loves/repositories/board-love.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([BoardLoveRepository]),
    BoardsModule,
  ],
  controllers: [BoardLovesController],
  providers: [BoardLovesService],
})
export class BoardLovesModule {}
