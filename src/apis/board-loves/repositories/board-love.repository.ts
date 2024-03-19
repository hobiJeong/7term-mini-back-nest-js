import { CustomRepository } from '@src/core/type-orm/decorators/custom-repository.decorator';
import { BoardLove } from '@src/entities/BoardLove';
import { Repository } from 'typeorm';

@CustomRepository(BoardLove)
export class BoardLoveRepository extends Repository<BoardLove> {}
