import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryDto } from '@src/apis/categories/dto/category.dto';
import { CategoryRepository } from '@src/apis/categories/repositories/category.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

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
