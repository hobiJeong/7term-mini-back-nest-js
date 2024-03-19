import { CustomRepository } from '@src/core/type-orm/decorators/custom-repository.decorator';
import { Token } from '@src/entities/Token';
import { Repository } from 'typeorm';

@CustomRepository(Token)
export class TokenRepository extends Repository<Token> {}
