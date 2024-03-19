import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Payload } from '@src/apis/auth/constants/payload.interface';
import { JwtAccessTokenGuard } from '@src/apis/auth/jwt/guards/jwt-access-token.guard';
import { BoardLovesService } from '@src/apis/board-loves/services/board-loves.service';
import { ApiCreateBoardLove } from '@src/apis/board-loves/swagger-decorators/api-create-board-love.swagger';
import { ApiDeleteBoardLove } from '@src/apis/board-loves/swagger-decorators/api-delete-board-love.swagger';
import { User } from '@src/common/decorators/user.decorator';
import { InternalServerErrorSwaggerBuilder } from '@src/common/dto/internal-server-error.builder';
import { ParsePositiveIntPipe } from '@src/common/pipes/parse-positive-int.pipe';
import { BoardLove } from '@src/entities/BoardLove';

@ApiTags('board-love')
@InternalServerErrorSwaggerBuilder()
@UseGuards(JwtAccessTokenGuard)
@Controller('boards/:boardId/board-loves')
export class BoardLovesController {
  constructor(private readonly boardLovesService: BoardLovesService) {}

  @Post()
  @ApiCreateBoardLove('게시글 좋아요 생성 API')
  @HttpCode(HttpStatus.NO_CONTENT)
  create(
    @Param('boardId', ParsePositiveIntPipe) boardId: number,
    @User() user: Payload,
  ): Promise<Pick<BoardLove, 'userId' | 'boardId'>> {
    return this.boardLovesService.create(user.id, boardId);
  }

  @Delete()
  @ApiDeleteBoardLove('게시글 좋아요 삭제 API')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('boardId', ParsePositiveIntPipe) boardId: number,
    @User() user: Payload,
  ): Promise<number> {
    return (await this.boardLovesService.delete(user.id, boardId)).affected;
  }
}
