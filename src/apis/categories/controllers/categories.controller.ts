import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAccessTokenGuard } from '@src/apis/auth/jwt/guards/jwt-access-token.guard';
import { CategoryDto } from '@src/apis/categories/dto/category.dto';
import { CreateCategoryRequestBodyDto } from '@src/apis/categories/dto/create-category-request-body.dto';
import { CategoriesService } from '@src/apis/categories/services/categories.service';
import { ApiCreateCategory } from '@src/apis/categories/swagger-decorators/api-create-category.swagger';
import { InternalServerErrorSwaggerBuilder } from '@src/common/dto/internal-server-error.builder';
import { RESPONSE_KEY } from '@src/interceptors/response-transformer-interceptor/constants/response-key.enum';
import { SetResponse } from '@src/interceptors/response-transformer-interceptor/decorators/set-response.decorator';

@ApiTags('category')
@InternalServerErrorSwaggerBuilder()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiCreateCategory('카테고리 생성 API')
  @Post()
  @SetResponse(RESPONSE_KEY.Category)
  @UseGuards(JwtAccessTokenGuard)
  create(
    @Body() createCategoryRequestBodyDto: CreateCategoryRequestBodyDto,
  ): Promise<CategoryDto> {
    return this.categoriesService.create(createCategoryRequestBodyDto);
  }
}
