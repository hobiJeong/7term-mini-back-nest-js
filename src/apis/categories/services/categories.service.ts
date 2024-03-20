import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryDto } from '@src/apis/categories/dto/category.dto';
import { CreateCategoryRequestBodyDto } from '@src/apis/categories/dto/create-category-request-body.dto';
import { CategoryRepository } from '@src/apis/categories/repositories/category.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(
    createCategoryRequestBodyDto: CreateCategoryRequestBodyDto,
  ): Promise<CategoryDto> {
    const { name } = createCategoryRequestBodyDto;

    const isExistCategory = await this.categoryRepository.existsBy({
      name,
    });

    if (isExistCategory) {
      throw new ConflictException('중복');
    }

    const newCategory = this.categoryRepository.create({
      name,
    });

    await this.categoryRepository.save(newCategory);

    return new CategoryDto(newCategory);
  }

  async findOneOrNotFound(categoryId: number): Promise<CategoryDto> {
    const category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });

    if (!category) {
      throw new NotFoundException("The category doesn't exist.");
    }

    return new CategoryDto(category);
  }
}
