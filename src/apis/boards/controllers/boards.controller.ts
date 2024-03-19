import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Payload } from '@src/apis/auth/constants/payload.interface';
import { JwtAccessTokenGuard } from '@src/apis/auth/jwt/guards/jwt-access-token.guard';
import { BoardDto } from '@src/apis/boards/dto/board.dto';
import { CreateBoardRequestBodyDto } from '@src/apis/boards/dto/create-board-request-body.dto';
import { BoardsService } from '@src/apis/boards/services/boards.service';
import { ApiCreateBoard } from '@src/apis/boards/swagger-decorators/api-create-board.swagger';
import { RESPONSE_KEY } from '@src/interceptors/response-transformer-interceptor/constants/response-key.enum';
import { User } from '@src/common/decorators/user.decorator';
import { InternalServerErrorSwaggerBuilder } from '@src/common/dto/internal-server-error.builder';
import { SetResponse } from '@src/interceptors/response-transformer-interceptor/decorators/set-response.decorator';
import { ParsePositiveIntPipe } from '@src/common/pipes/parse-positive-int.pipe';
import { ApiFindOneBoard } from '@src/apis/boards/swagger-decorators/api-find-one-board.swagger';
import { FindBoardsQueryDto } from '@src/apis/boards/dto/find-boards-query.dto';
import { ResponseType } from '@src/interceptors/response-transformer-interceptor/constants/response-type.enum';
import { FindOneBoardResponseDto } from '@src/apis/boards/dto/find-one-board-response.dto';
import { FindBoardsResponseDto } from '@src/apis/boards/dto/find-boards-response.dto';
import { ApiFindBoards } from '@src/apis/boards/swagger-decorators/api-find-boards.swagger';

@ApiTags('board')
@InternalServerErrorSwaggerBuilder()
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @ApiCreateBoard('게시글 생성 API')
  @Post()
  @UseGuards(JwtAccessTokenGuard)
  @SetResponse(RESPONSE_KEY.Board)
  create(
    @User() user: Payload,
    @Body() createBoardRequestBodyDto: CreateBoardRequestBodyDto,
  ): Promise<BoardDto> {
    return this.boardsService.create(user.id, createBoardRequestBodyDto);
  }

  @ApiFindBoards('게시글 전체 조회 API')
  @Get()
  @SetResponse(RESPONSE_KEY.Boards, ResponseType.Pagination)
  async find(
    @Query() findBoardsQueryDto: FindBoardsQueryDto,
  ): Promise<[FindBoardsResponseDto[], number]> {
    const [boards, totalCount] =
      await this.boardsService.findByPagination(findBoardsQueryDto);

    return [
      boards.map(
        (board) =>
          new FindBoardsResponseDto({
            ...board,
            boardCommentsCount: Number(board.boardCommentsCount),
            boardLovesCount: Number(board.boardLovesCount),
          }),
      ),
      totalCount,
    ];
  }

  @ApiFindOneBoard('게시글 상세 조회 API')
  @Get(':boardId')
  @SetResponse(RESPONSE_KEY.Board)
  findOne(
    @Param('boardId', ParsePositiveIntPipe) boardId: number,
  ): Promise<FindOneBoardResponseDto> {
    return this.boardsService.findOneWithUserAndLoveOrNotFound(boardId);
  }

  @Delete(':boardId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @User() user: Payload,
    @Param('boardId', ParsePositiveIntPipe) boardId: number,
  ): Promise<number> {
    return (await this.boardsService.delete(user.id, boardId)).affected;
  }
}
