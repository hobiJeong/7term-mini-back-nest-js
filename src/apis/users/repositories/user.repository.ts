import { CustomRepository } from '@src/core/type-orm/decorators/custom-repository.decorator';
import { User } from '@src/entities/User';
import { Repository } from 'typeorm';

@CustomRepository(User)
export class UserRepository extends Repository<User> {}
