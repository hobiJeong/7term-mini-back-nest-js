import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BoardCommentDto } from '@src/apis/board-comments/dto/board-comment.dto';
import { CreateBoardCommentRequestBodyDto } from '@src/apis/board-comments/dto/create-board-comment-request-body.dto';
import { FindBoardCommentsQueryDto } from '@src/apis/board-comments/dto/find-board-comments-query.dto';
import { BoardCommentRepository } from '@src/apis/board-comments/repositories/board-comment.repository';
import { BoardsService } from '@src/apis/boards/services/boards.service';
import { BoardComment } from '@src/entities/BoardComment';
import { QueryHelper } from '@src/helpers/providers/query.helper';
import { UpdateResult } from 'typeorm';

@Injectable()
export class BoardCommentsService {
  private readonly LIKE_SEARCH_FIELD: readonly (keyof Pick<
    BoardComment,
    'content'
  >)[] = ['content'];

  constructor(
    private readonly boardCommentRepository: BoardCommentRepository,
    private readonly boardsService: BoardsService,
    private readonly queryHelper: QueryHelper,
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

  async findByPagination(
    boardId: number,
    findBoardCommentsQueryDto: FindBoardCommentsQueryDto,
  ): Promise<[BoardComment[], number]> {
    const { orderField, sortOrder, page, pageSize, ...filter } =
      findBoardCommentsQueryDto;

    const existBoard = await this.boardsService.findOneOrNotFound(boardId);

    const skip = (page - 1) * pageSize;

    filter['boardId'] = existBoard.id;

    const where = this.queryHelper.buildWherePropForFind(
      filter,
      this.LIKE_SEARCH_FIELD,
    );

    const order = this.queryHelper.buildOrderByPropForFind(
      orderField,
      sortOrder,
    );

    return this.boardCommentRepository.findAndCount({
      where,
      order,
      skip,
      take: pageSize,
    });
  }

  async findOneOrNotFound(boardId: number, boardCommentId: number) {
    const existBoardComment = await this.boardCommentRepository.findOne({
      where: {
        id: boardCommentId,
        boardId,
      },
    });

    if (!existBoardComment) {
      throw new NotFoundException("The comment doesn't exist.");
    }

    return new BoardCommentDto(existBoardComment);
  }

  async delete(
    userId: number,
    boardId: number,
    boardCommentId: number,
  ): Promise<UpdateResult> {
    const existBoardComment = await this.findOneOrNotFound(
      boardId,
      boardCommentId,
    );

    if (existBoardComment.userId !== userId) {
      throw new ForbiddenException("You don't have permission to access it.");
    }

    return this.boardCommentRepository.update(
      {
        id: existBoardComment.id,
        boardId: existBoardComment.boardId,
      },
      {
        deletedAt: new Date(),
      },
    );
  }
}
