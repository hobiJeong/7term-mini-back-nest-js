import { ApiProperty } from '@nestjs/swagger';
import { BoardDto } from '@src/apis/boards/dto/board.dto';
import { CategoryDto } from '@src/apis/categories/dto/category.dto';
import { UserDto } from '@src/apis/users/dto/user.dto';

export class FindOneBoardResponseDto extends BoardDto {
  @ApiProperty({
    description: '게시글에 달린 좋아요 개수',
    format: 'integer',
    minimum: 0,
  })
  boardLovesCount: number;

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

  constructor(findOneBoardResponseDto: FindOneBoardResponseDto) {
    super(findOneBoardResponseDto);

    this.boardLovesCount = Number(findOneBoardResponseDto.boardLovesCount);
    this.user = new UserDto(findOneBoardResponseDto.user);
    this.category = new CategoryDto(findOneBoardResponseDto.category);
  }
}
