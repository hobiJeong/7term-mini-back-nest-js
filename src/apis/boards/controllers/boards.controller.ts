import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Payload } from '@src/apis/auth/constants/payload.interface';
import { JwtAccessTokenGuard } from '@src/apis/auth/jwt/guards/jwt-access-token.guard';
import { BoardDto } from '@src/apis/boards/dto/board.dto';
import { CreateBoardRequestBodyDto } from '@src/apis/boards/dto/create-board-request-body.dto';
import { BoardsService } from '@src/apis/boards/services/boards.service';
import { ApiCreateBoard } from '@src/apis/boards/swagger-decorators/api-create-board.swagger';
import { RESPONSE_KEY } from '@src/common/constants/response-key.enum';
import { User } from '@src/common/decorators/user.decorator';
import { InternalServerErrorSwaggerBuilder } from '@src/common/dto/internal-server-error.builder';
import { SetResponse } from '@src/interceptors/response-transformer-interceptor/decorators/set-response.decorator';

@ApiTags('board')
@InternalServerErrorSwaggerBuilder()
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @ApiCreateBoard('게시글 생성 API')
  @Post()
  @UseGuards(JwtAccessTokenGuard)
  @SetResponse(RESPONSE_KEY.BOARD)
  create(
    @User() user: Payload,
    @Body() createBoardRequestBodyDto: CreateBoardRequestBodyDto,
  ): Promise<BoardDto> {
    return this.boardsService.create(user.id, createBoardRequestBodyDto);
  }
}
