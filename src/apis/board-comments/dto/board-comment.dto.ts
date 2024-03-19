import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@src/common/dto/base.dto';
import { BoardComment } from '@src/entities/BoardComment';
import { Exclude } from 'class-transformer';

export class BoardCommentDto
  extends BaseDto
  implements
    Pick<
      BoardComment,
      'id' | 'boardId' | 'userId' | 'content' | 'createdAt' | 'deletedAt'
    >
{
  @ApiProperty({
    description: '게시글 고유 ID',
    format: 'integer',
    minimum: 1,
  })
  boardId: number;

  @ApiProperty({
    description: '댓글 작성자 고유 ID',
    format: 'integer',
    minimum: 1,
  })
  userId: number;

  @ApiProperty({
    description: '댓글 본문',
    minLength: 1,
  })
  content: string;

  @Exclude()
  deletedAt: Date | null;

  constructor(boardCommentDto: Partial<BoardCommentDto> = {}) {
    super();

    Object.assign(this, boardCommentDto);
  }
}
