import { CustomRepository } from '@src/core/type-orm/decorators/custom-repository.decorator';
import { Board } from '@src/entities/Board';
import { Repository } from 'typeorm';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {}
