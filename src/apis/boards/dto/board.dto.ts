import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@src/common/dto/base.dto';
import { Board } from '@src/entities/Board';

export class BoardDto
  extends BaseDto
  implements
    Pick<
      Board,
      | 'id'
      | 'userId'
      | 'categoryId'
      | 'content'
      | 'createdAt'
      | 'updatedAt'
      | 'deletedAt'
    >
{
  @ApiProperty({
    description: '유저 고유 ID',
    format: 'integer',
    minimum: 1,
  })
  userId: number;

  @ApiProperty({
    description: '카테고리 고유 ID',
    format: 'integer',
    minimum: 1,
  })
  categoryId: number;

  @ApiProperty({
    description: '게시글 본문',
    minimum: 1,
  })
  content: string;

  deletedAt: Date;
}
