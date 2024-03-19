import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Payload } from '@src/apis/auth/constants/payload.interface';
import { JwtAccessTokenGuard } from '@src/apis/auth/jwt/guards/jwt-access-token.guard';
import { BoardCommentDto } from '@src/apis/board-comments/dto/board-comment.dto';
import { CreateBoardCommentRequestBodyDto } from '@src/apis/board-comments/dto/create-board-comment-request-body.dto';
import { FindBoardCommentsQueryDto } from '@src/apis/board-comments/dto/find-board-comments-query.dto';
import { BoardCommentsService } from '@src/apis/board-comments/services/board-comments.service';
import { ApiCreateBoardComment } from '@src/apis/board-comments/swagger-decorators/api-create-board-comment.swagger';
import { User } from '@src/common/decorators/user.decorator';
import { InternalServerErrorSwaggerBuilder } from '@src/common/dto/internal-server-error.builder';
import { ParsePositiveIntPipe } from '@src/common/pipes/parse-positive-int.pipe';
import { RESPONSE_KEY } from '@src/interceptors/response-transformer-interceptor/constants/response-key.enum';
import { ResponseType } from '@src/interceptors/response-transformer-interceptor/constants/response-type.enum';
import { SetResponse } from '@src/interceptors/response-transformer-interceptor/decorators/set-response.decorator';

@ApiTags('board-comments')
@InternalServerErrorSwaggerBuilder()
@Controller('boards/:boardId/board-comments')
export class BoardCommentsController {
  constructor(private readonly boardCommentsService: BoardCommentsService) {}

  @ApiCreateBoardComment('댓글 생성 API')
  @Post()
  @UseGuards(JwtAccessTokenGuard)
  @SetResponse(RESPONSE_KEY.Comment)
  create(
    @User() user: Payload,
    @Param('boardId', ParsePositiveIntPipe) boardId: number,
    @Body() createBoardCommentRequestBodyDto: CreateBoardCommentRequestBodyDto,
  ): Promise<BoardCommentDto> {
    return this.boardCommentsService.create(
      user.id,
      boardId,
      createBoardCommentRequestBodyDto,
    );
  }

  @Get()
  @SetResponse(RESPONSE_KEY.Comments, ResponseType.Pagination)
  find(
    @Param('boardId', ParsePositiveIntPipe) boardId: number,
    @Query() findBoardCommentsQueryDto: FindBoardCommentsQueryDto,
  ) {
    return this.boardCommentsService.findByPagination(
      boardId,
      findBoardCommentsQueryDto,
    );
  }
}
