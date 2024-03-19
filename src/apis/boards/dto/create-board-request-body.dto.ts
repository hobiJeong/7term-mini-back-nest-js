import { ApiProperty } from '@nestjs/swagger';
import { BoardDto } from '@src/apis/boards/dto/board.dto';
import { IsPositiveInt } from '@src/common/decorators/validators/is-positive-int.decorator';
import { MinLength } from 'class-validator';

export class CreateBoardRequestBodyDto
  implements Pick<BoardDto, 'categoryId' | 'content'>
{
  @ApiProperty({
    description: '카테고리 고유 ID',
    minimum: 1,
    format: 'integer',
  })
  @IsPositiveInt()
  categoryId: number;

  @ApiProperty({
    description: '게시글 본문',
    minLength: 1,
  })
  @MinLength(1)
  content: string;
}
