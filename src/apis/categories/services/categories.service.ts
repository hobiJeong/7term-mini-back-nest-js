import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryDto } from '@src/apis/categories/dto/category.dto';
import { CategoryRepository } from '@src/apis/categories/repositories/category.repository';
import { Category } from '@src/entities/Category';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findOneBy(categoryId: number): Promise<CategoryDto> | null {
    return this.findOne({
      where: { id: categoryId },
    });
  }

  async findOne(
    options: FindOneOptions<Category>,
  ): Promise<CategoryDto> | null {
    const category = await this.categoryRepository.findOne(options);

    return category ? new CategoryDto(category) : null;
  }

  async findOneOrNotFound(categoryId: number): Promise<CategoryDto> {
    const category = await this.findOneBy(categoryId);

    if (!category) {
      throw new NotFoundException("The category doesn't exist.");
    }

    return category;
  }
}
