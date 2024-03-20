import { ApiProperty } from '@nestjs/swagger';
import { CATEGORY_NAME_LENGTH } from '@src/apis/categories/constants/category.constant';
import { CategoryDto } from '@src/apis/categories/dto/category.dto';
import { Length } from 'class-validator';

export class CreateCategoryRequestBodyDto implements Pick<CategoryDto, 'name'> {
  @ApiProperty({
    description: '카테고리 이름',
    minLength: CATEGORY_NAME_LENGTH.MIN,
    maxLength: CATEGORY_NAME_LENGTH.MAX,
  })
  @Length(CATEGORY_NAME_LENGTH.MIN, CATEGORY_NAME_LENGTH.MAX)
  name: string;
}
