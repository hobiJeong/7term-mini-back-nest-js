import { Module } from '@nestjs/common';
import { CategoriesController } from '@src/apis/categories/controllers/categories.controller';
import { CategoryRepository } from '@src/apis/categories/repositories/category.repository';
import { CategoriesService } from '@src/apis/categories/services/categories.service';
import { TypeOrmExModule } from '@src/core/type-orm/type-orm-ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([CategoryRepository])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
