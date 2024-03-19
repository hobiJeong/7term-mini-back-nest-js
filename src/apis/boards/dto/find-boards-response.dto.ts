import { ApiProperty } from '@nestjs/swagger';
import { BoardDto } from '@src/apis/boards/dto/board.dto';
import { CategoryDto } from '@src/apis/categories/dto/category.dto';
import { UserDto } from '@src/apis/users/dto/user.dto';

export class FindBoardsResponseDto extends BoardDto {
  @ApiProperty({
    description: '카테고리 정보',
    type: CategoryDto,
  })
  category: CategoryDto;

  @ApiProperty({
    description: '게시글을 작성한 유저 정보',
    type: UserDto,
  })
  user: UserDto;

  @ApiProperty({
    description: '게시글에 달린 댓글 갯수',
    format: 'integer',
    minimum: 0,
  })
  boardCommentsCount: number;

  @ApiProperty({
    description: '게시글에 달린 좋아요 갯수',
    format: 'integer',
    minimum: 0,
  })
  boardLovesCount: number;

  constructor(findBoardsResponseDto: Partial<FindBoardsResponseDto> = {}) {
    super(findBoardsResponseDto);

    const { category, user, boardCommentsCount, boardLovesCount } =
      findBoardsResponseDto;

    this.category = new CategoryDto(category);
    this.user = new UserDto(user);
    this.boardCommentsCount = Number(boardCommentsCount);
    this.boardLovesCount = Number(boardLovesCount);
  }
}
