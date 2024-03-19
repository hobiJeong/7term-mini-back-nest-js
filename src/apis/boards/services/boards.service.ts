import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardDto } from '@src/apis/boards/dto/board.dto';
import { CreateBoardRequestBodyDto } from '@src/apis/boards/dto/create-board-request-body.dto';
import { FindBoardsQueryDto } from '@src/apis/boards/dto/find-boards-query.dto';
import { FindOneBoardResponseDto } from '@src/apis/boards/dto/find-one-board-response.dto';
import { BoardRepository } from '@src/apis/boards/repositories/board.repository';
import { CategoriesService } from '@src/apis/categories/services/categories.service';
import { Board } from '@src/entities/Board';
import { Category } from '@src/entities/Category';
import { User } from '@src/entities/User';
import { QueryBuilderHelper } from '@src/helpers/providers/query-builder.helper';

@Injectable()
export class BoardsService {
  private readonly LIKE_SEARCH_FILED: readonly (keyof Pick<
    Board,
    'content'
  >)[] = ['content'];

  constructor(
    private readonly boardRepository: BoardRepository,
    private readonly categoriesService: CategoriesService,
    private readonly queryBuilderHelper: QueryBuilderHelper,
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

  async findOneOrNotFound(boardId: number): Promise<BoardDto> {
    const existBoard = await this.boardRepository.findOneBy({ id: boardId });

    if (!existBoard) {
      throw new NotFoundException("The board doesn't exist.");
    }

    return new BoardDto(existBoard);
  }

  async findOneWithUserAndLoveOrNotFound(
    boardId: number,
  ): Promise<FindOneBoardResponseDto> {
    const existBoard = await this.boardRepository
      .createQueryBuilder('board')
      .select([
        'board.id as id',
        'board.userId as userId',
        'board.categoryId as categoryId',
        'board.content as content',
        'board.createdAt as createdAt',
        'board.updatedAt as updatedAt',
        'JSON_OBJECT("id", category.id, "name", category.name, "createdAt", category.createdAt, "updatedAt", category.updatedAt)',
        'COUNT(DISTINCT boardLoves.id) as boardLovesCount',
        'JSON_OBJECT("id", user.id, "nickname", user.nickname, "loginId", user.loginId, "email", user.email, "createdAt", user.createdAt, "updatedAt", user.updatedAt) as user',
      ])
      .leftJoin('board.boardLoves', 'boardLoves')
      .innerJoin('board.user', 'user')
      .innerJoin('board.category', 'category')
      .where('board.id = :boardId', { boardId })
      .getRawOne();

    if (!existBoard) {
      throw new NotFoundException("The board doesn't exist.");
    }

    return new FindOneBoardResponseDto(existBoard);
  }

  async findByPagination(findBoardsQueryDto: FindBoardsQueryDto): Promise<
    [
      {
        id: number;
        userId: number;
        categoryId: number;
        content: string;
        createdAt: Date;
        updatedAt: Date;
        category: Category;
        boardLovesCount: string;
        boardCommentsCount: string;
        user: User;
      }[],
      number,
    ]
  > {
    const { orderField, sortOrder, page, pageSize, ...filter } =
      findBoardsQueryDto;

    const category = await this.categoriesService.findOneOrNotFound(
      filter.categoryId,
    );

    filter.categoryId = category.id;

    const skip = (page - 1) * pageSize;

    const queryBuilder = this.boardRepository
      .createQueryBuilder('board')
      .select([
        'board.id as id',
        'board.userId as userId',
        'board.categoryId as categoryId',
        'board.content as content',
        'board.createdAt as createdAt',
        'board.updatedAt as updatedAt',
        'JSON_OBJECT("id", category.id, "name", category.name, "createdAt", category.createdAt, "updatedAt", category.updatedAt) as category',
        'COUNT(DISTINCT boardLoves.id) as boardLovesCount',
        'COUNT(DISTINCT boardComments.id) as boardCommentsCount',
        'JSON_OBJECT("id", user.id, "nickname", user.nickname, "loginId", user.loginId, "email", user.email, "createdAt", user.createdAt, "updatedAt", user.updatedAt) as user',
      ])
      .leftJoin('board.boardLoves', 'boardLoves')
      .innerJoin('board.user', 'user')
      .innerJoin('board.category', 'category')
      .leftJoin('board.boardComments', 'boardComments');

    this.queryBuilderHelper.buildWherePropForFind(
      queryBuilder,
      filter,
      'board',
      this.LIKE_SEARCH_FILED,
    );

    this.queryBuilderHelper.buildOrderByPropForFind(
      queryBuilder,
      'board',
      orderField,
      sortOrder,
    );

    return Promise.all([
      queryBuilder.offset(skip).limit(pageSize).groupBy('id').getRawMany(),
      queryBuilder.getCount(),
    ]);
  }
}
