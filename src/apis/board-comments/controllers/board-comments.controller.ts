import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { Payload } from '@src/apis/auth/constants/payload.interface';
import { JwtAccessTokenGuard } from '@src/apis/auth/jwt/guards/jwt-access-token.guard';
import { BoardCommentDto } from '@src/apis/board-comments/dto/board-comment.dto';
import { CreateBoardCommentRequestBodyDto } from '@src/apis/board-comments/dto/create-board-comment-request-body.dto';
import { BoardCommentsService } from '@src/apis/board-comments/services/board-comments.service';
import { User } from '@src/common/decorators/user.decorator';
import { ParsePositiveIntPipe } from '@src/common/pipes/parse-positive-int.pipe';
import { RESPONSE_KEY } from '@src/interceptors/response-transformer-interceptor/constants/response-key.enum';
import { SetResponse } from '@src/interceptors/response-transformer-interceptor/decorators/set-response.decorator';

@Controller('boards/:boardId/board-comments')
export class BoardCommentsController {
  constructor(private readonly boardCommentsService: BoardCommentsService) {}

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
}
