import { CustomRepository } from '@src/core/type-orm/decorators/custom-repository.decorator';
import { BoardComment } from '@src/entities/BoardComment';
import { Repository } from 'typeorm';

@CustomRepository(BoardComment)
export class BoardCommentRepository extends Repository<BoardComment> {}
