import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@src/common/dto/base.dto';
import { Category } from '@src/entities/Category';

export class CategoryDto
  extends BaseDto
  implements Pick<Category, 'id' | 'name' | 'createdAt' | 'updatedAt'>
{
  @ApiProperty({
    description: '카테고리 고유 이름',
    minLength: 1,
    maxLength: 20,
  })
  name: string;

  constructor(categoryDto: CategoryDto) {
    super();

    Object.assign(this, categoryDto);
  }
}
