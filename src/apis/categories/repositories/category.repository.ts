import { CustomRepository } from '@src/core/type-orm/decorators/custom-repository.decorator';
import { Category } from '@src/entities/Category';
import { Repository } from 'typeorm';

@CustomRepository(Category)
export class CategoryRepository extends Repository<Category> {}
