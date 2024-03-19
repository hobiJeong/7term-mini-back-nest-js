import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserRequestBodyDto } from '@src/apis/users/dto/create-user-request-body.dto';
import { UserDto } from '@src/apis/users/dto/user.dto';
import { UserRepository } from '@src/apis/users/repositories/user.repository';
import { User } from '@src/entities/User';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(
    createUserRequestBodyDto: CreateUserRequestBodyDto,
  ): Promise<UserDto> {
    const { nickname, loginId, email } = createUserRequestBodyDto;

    await this.checkUserExists({ nickname, loginId, email });

    const newUser = await this.userRepository.save({
      ...createUserRequestBodyDto,
    });

    return new UserDto(newUser);
  }

  async findOne(options: FindOneOptions<User>): Promise<UserDto> {
    const existUser = await this.userRepository.findOne(options);

    return existUser ? new UserDto(existUser) : null;
  }

  async findOneOrNotFound(userId: number) {
    const existUser = await this.findOne({
      where: { id: userId },
    });

    if (!existUser) {
      throw new NotFoundException("The user doesn't exist.");
    }

    return existUser;
  }

  async delete(myId: number, userId: number): Promise<number> {
    const existUser = await this.findOneOrNotFound(userId);

    if (myId === existUser.id) {
      throw new ForbiddenException("You don't have permission to access it.");
    }

    const updateResult = await this.userRepository.update(
      { id: userId },
      {
        deletedAt: new Date(),
      },
    );

    return updateResult.affected;
  }

  private async checkUserExists(
    newUser: Pick<UserDto, 'email' | 'nickname' | 'loginId'>,
  ): Promise<void> {
    const { loginId, nickname, email } = newUser;

    const existUser = await this.findOne({
      where: [{ loginId }, { nickname }, { email }],
    });

    if (nickname === existUser?.nickname) {
      throw new ConflictException('A nickname that already exists.');
    }

    if (loginId === existUser?.loginId) {
      throw new ConflictException('A login id that already exists.');
    }

    if (email === existUser?.email) {
      throw new ConflictException('An email that already exists.');
    }

    return;
  }
}
