import { BoardCommentDto } from '@src/apis/board-comments/dto/board-comment.dto';

export class CreateBoardCommentDto
  implements Pick<BoardCommentDto, 'userId' | 'boardId' | 'content'>
{
  readonly userId: number;

  readonly boardId: number;

  readonly content: string;

  constructor(createBoardCommentDto: CreateBoardCommentDto) {
    Object.assign(this, createBoardCommentDto);
  }
}
