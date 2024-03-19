import { Injectable } from '@nestjs/common';
import { BoardCommentDto } from '@src/apis/board-comments/dto/board-comment.dto';
import { CreateBoardCommentRequestBodyDto } from '@src/apis/board-comments/dto/create-board-comment-request-body.dto';
import { BoardCommentRepository } from '@src/apis/board-comments/repositories/board-comment.repository';
import { BoardsService } from '@src/apis/boards/services/boards.service';

@Injectable()
export class BoardCommentsService {
  constructor(
    private readonly boardCommentRepository: BoardCommentRepository,
    private readonly boardsService: BoardsService,
  ) {}

  async create(
    userId: number,
    boardId: number,
    createBoardCommentRequestBodyDto: CreateBoardCommentRequestBodyDto,
  ): Promise<BoardCommentDto> {
    const existBoard = await this.boardsService.findOneOrNotFound(boardId);

    const newBoardComment = this.boardCommentRepository.create({
      userId,
      boardId: existBoard.id,
      ...createBoardCommentRequestBodyDto,
    });

    await this.boardCommentRepository.save(newBoardComment);

    return new BoardCommentDto(newBoardComment);
  }
}
