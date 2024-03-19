import { ConflictException, Injectable } from '@nestjs/common';
import { BoardLoveRepository } from '@src/apis/board-loves/repositories/board-love.repository';
import { BoardsService } from '@src/apis/boards/services/boards.service';
import { BoardLove } from '@src/entities/BoardLove';
import { DeleteResult } from 'typeorm';

@Injectable()
export class BoardLovesService {
  constructor(
    private readonly boardLoveRepository: BoardLoveRepository,
    private readonly boardsService: BoardsService,
  ) {}

  async create(
    userId: number,
    boardId: number,
  ): Promise<Pick<BoardLove, 'userId' | 'boardId'>> {
    const existBoard = await this.boardsService.findOneOrNotFound(boardId);

    const isBoardLove = await this.isExistsBoardLove(userId, existBoard.id);

    if (isBoardLove) {
      throw new ConflictException('Likes already exist on the post.');
    }

    return this.boardLoveRepository.save(
      {
        userId,
        boardId: existBoard.id,
      },
      { reload: false },
    );
  }

  async delete(userId: number, boardId: number): Promise<DeleteResult> {
    const existBoard = await this.boardsService.findOneOrNotFound(boardId);

    const isBoardLove = await this.isExistsBoardLove(userId, existBoard.id);

    if (!isBoardLove) {
      throw new ConflictException('Likes already doesn’t exist on the post.');
    }

    return this.boardLoveRepository.delete({
      boardId: existBoard.id,
      userId,
    });
  }

  private isExistsBoardLove(userId: number, boardId: number): Promise<boolean> {
    return this.boardLoveRepository.existsBy({ userId, boardId });
  }
}
