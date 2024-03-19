import { ApiPropertyOptional } from '@nestjs/swagger';
import { BoardOrderField } from '@src/apis/boards/constants/board-order-field.enum';
import { BoardDto } from '@src/apis/boards/dto/board.dto';
import { SortOrder } from '@src/common/constants/sort-order.enum';
import { IsPositiveInt } from '@src/common/decorators/validators/is-positive-int.decorator';
import { PageQueryDto } from '@src/common/dto/page-query.dto';
import { IsEnum, IsOptional, MinLength } from 'class-validator';

export class FindBoardsQueryDto
  extends PageQueryDto
  implements
    Partial<Pick<BoardDto, 'id' | 'userId' | 'categoryId' | 'content'>>
{
  @ApiPropertyOptional({
    description: '게시글 고유 ID 필터링',
    format: 'integer',
  })
  @IsOptional()
  @IsPositiveInt()
  id?: number;

  @ApiPropertyOptional({
    description: '게시글 작성 유저 고유 ID 필터링',
    format: 'integer',
  })
  @IsOptional()
  @IsPositiveInt()
  userId?: number;

  @ApiPropertyOptional({
    description: '카테고리 고유 ID 필터링',
    format: 'integer',
  })
  @IsOptional()
  @IsPositiveInt()
  categoryId?: number;

  @ApiPropertyOptional({
    description: '게시글 본문 필터링',
    minLength: 1,
  })
  @IsOptional()
  @MinLength(1)
  content?: string;

  @ApiPropertyOptional({
    description: '게시글 테이블 정렬 필드',
    default: BoardOrderField.Id,
    enum: BoardOrderField,
  })
  @IsOptional()
  @IsEnum(BoardOrderField)
  orderField: BoardOrderField = BoardOrderField.Id;

  @ApiPropertyOptional({
    description: '오름차순 혹은 내림차순',
    default: SortOrder.ASC,
    enum: SortOrder,
  })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder: SortOrder = SortOrder.ASC;
}
