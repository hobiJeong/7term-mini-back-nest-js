import { ApiPropertyOptional } from '@nestjs/swagger';
import { BoardCommentOrderField } from '@src/apis/board-comments/constants/board-comment-order-field.enum';
import { BoardCommentDto } from '@src/apis/board-comments/dto/board-comment.dto';
import { SortOrder } from '@src/common/constants/sort-order.enum';
import { IsPositiveInt } from '@src/common/decorators/validators/is-positive-int.decorator';
import { PageQueryDto } from '@src/common/dto/page-query.dto';
import { IsEnum, IsOptional, MinLength } from 'class-validator';

export class FindBoardCommentsQueryDto
  extends PageQueryDto
  implements Partial<Pick<BoardCommentDto, 'id' | 'userId' | 'content'>>
{
  @ApiPropertyOptional({
    description: '댓글 고유 ID 필터링',
    format: 'integer',
  })
  @IsOptional()
  @IsPositiveInt()
  id?: number;

  @ApiPropertyOptional({
    description: '댓글 작성자 고유 ID 필터링',
    format: 'integer',
  })
  @IsOptional()
  @IsPositiveInt()
  userId?: number;

  @ApiPropertyOptional({
    description: '댓글 본문 필터링',
    minLength: 1,
  })
  @IsOptional()
  @MinLength(1)
  content?: string;

  @ApiPropertyOptional({
    description: '댓글 정렬 필드',
    default: BoardCommentOrderField.Id,
    enum: BoardCommentOrderField,
  })
  @IsOptional()
  @IsEnum(BoardCommentOrderField)
  orderField: BoardCommentOrderField = BoardCommentOrderField.Id;

  @ApiPropertyOptional({
    description: '오름차순 혹은 내림차순',
    default: SortOrder.ASC,
    enum: SortOrder,
  })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder: SortOrder = SortOrder.ASC;
}
