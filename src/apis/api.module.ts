import { Module } from '@nestjs/common';
import { AuthModule } from '@src/apis/auth/auth.module';
import { BoardsModule } from '@src/apis/boards/boards.module';
import { CategoriesModule } from '@src/apis/categories/categories.module';
import { BoardCommentsModule } from '@src/apis/board-comments/board-comments.module';
import { BoardLovesModule } from '@src/apis/board-loves/board-loves.module';
import { UsersModule } from '@src/apis/users/users.module';

@Module({
  imports: [
    AuthModule,
    BoardsModule,
    CategoriesModule,
    BoardCommentsModule,
    BoardLovesModule,
    UsersModule,
  ],
})
export class ApiModule {}
