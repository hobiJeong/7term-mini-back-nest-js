import { CreateBoardCommentDto } from '@src/apis/board-comments/dto/create-board-comment.dto';
import { IBoardCommentRepository } from '@src/apis/board-comments/repositories/iboard-comment.repository';
import { FindByPaginationParameter } from '@src/common/constants/find-by-pagination-parameter.interface';
import { CustomRepository } from '@src/core/type-orm/decorators/custom-repository.decorator';
import { BoardComment } from '@src/entities/BoardComment';
import { FindOneOptions, Repository, UpdateResult } from 'typeorm';

@CustomRepository(BoardComment)
export class BoardCommentRepository
  extends Repository<BoardComment>
  implements IBoardCommentRepository
{
  saveBoard(
    createBoardCommentDto: CreateBoardCommentDto,
  ): Promise<BoardComment> {
    return this.save(
      this.create({
        ...new CreateBoardCommentDto({ ...createBoardCommentDto }),
      }),
    );
  }

  findByPagination(
    boardId: number,
    findByPaginationParameter: FindByPaginationParameter<
      Pick<BoardComment, 'id' | 'userId' | 'content'>
    >,
  ): Promise<[BoardComment[], number]> {
    const { where } = findByPaginationParameter;

    return this.findAndCount({
      ...findByPaginationParameter,
      where: {
        ...where,
        boardId,
      },
    });
  }

  findOneBoardComment(
    options: FindOneOptions<BoardComment>,
  ): Promise<BoardComment> {
    return this.findOne(options);
  }

  deleteBoardComment(
    boardComment: Pick<BoardComment, 'id' | 'boardId'> & Partial<BoardComment>,
  ): Promise<UpdateResult> {
    const { id, boardId } = boardComment;

    return this.update(
      { id, boardId },
      { ...boardComment, deletedAt: new Date() },
    );
  }
}
