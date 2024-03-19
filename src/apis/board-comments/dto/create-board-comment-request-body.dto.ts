import { ApiProperty } from '@nestjs/swagger';
import { BoardCommentDto } from '@src/apis/board-comments/dto/board-comment.dto';
import { MinLength } from 'class-validator';

export class CreateBoardCommentRequestBodyDto
  implements Pick<BoardCommentDto, 'content'>
{
  @ApiProperty({
    description: '게시글 본문',
    minLength: 1,
  })
  @MinLength(1)
  content: string;
}
