import { CreateBoardCommentDto } from '@src/apis/board-comments/dto/create-board-comment.dto';
import { FindByPaginationParameter } from '@src/common/constants/find-by-pagination-parameter.interface';
import { BoardComment } from '@src/entities/BoardComment';
import { FindOneOptions, UpdateResult } from 'typeorm';

export interface IBoardCommentRepository {
  saveBoard: (
    createBoardCommentDto: CreateBoardCommentDto,
  ) => Promise<BoardComment>;

  findByPagination: (
    boardId: number,
    findByPaginationParameter: FindByPaginationParameter<
      Pick<BoardComment, 'id' | 'userId' | 'content'>
    >,
  ) => Promise<[BoardComment[], number]>;

  findOneBoardComment: (
    options: FindOneOptions<BoardComment>,
  ) => Promise<BoardComment>;

  deleteBoardComment: (
    boardComment: Pick<BoardComment, 'id' | 'boardId'> & Partial<BoardComment>,
  ) => Promise<UpdateResult>;
}
