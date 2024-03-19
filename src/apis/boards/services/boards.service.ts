import { Injectable } from '@nestjs/common';
import { BoardDto } from '@src/apis/boards/dto/board.dto';
import { CreateBoardRequestBodyDto } from '@src/apis/boards/dto/create-board-request-body.dto';
import { BoardRepository } from '@src/apis/boards/repositories/board.repository';
import { CategoriesService } from '@src/apis/categories/services/categories.service';

@Injectable()
export class BoardsService {
  constructor(
    private readonly boardRepository: BoardRepository,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(
    userId: number,
    createBoardRequestBodyDto: CreateBoardRequestBodyDto,
  ): Promise<BoardDto> {
    const { categoryId, content } = createBoardRequestBodyDto;

    const existCategory =
      await this.categoriesService.findOneOrNotFound(categoryId);

    const newBoard = this.boardRepository.create({
      userId,
      categoryId: existCategory.id,
      content,
    });

    await this.boardRepository.save(newBoard);

    return new BoardDto(newBoard);
  }
}
