import { ApiProperty } from '@nestjs/swagger';
import {
  USER_NICKNAME_LENGTH,
  USER_EMAIL_LENGTH,
  USER_LOGIN_ID_LENGTH,
} from '@src/apis/users/constants/user.constant';
import { BaseDto } from '@src/common/dto/base.dto';
import { User } from '@src/entities/User';
import { Exclude } from 'class-transformer';

export class UserDto
  extends BaseDto
  implements
    Pick<
      User,
      | 'id'
      | 'nickname'
      | 'loginId'
      | 'password'
      | 'email'
      | 'createdAt'
      | 'updatedAt'
      | 'deletedAt'
    >
{
  @ApiProperty({
    description: '유저 닉네임',
    minLength: USER_NICKNAME_LENGTH.MIN,
    maxLength: USER_NICKNAME_LENGTH.MAX,
  })
  nickname: string;

  @ApiProperty({
    description: '유저 이메일',
    format: 'email',
    minLength: USER_EMAIL_LENGTH.MIN,
    maxLength: USER_EMAIL_LENGTH.MAX,
  })
  email: string;

  @ApiProperty({
    description: '유저 로그인 ID',
    minLength: USER_LOGIN_ID_LENGTH.MIN,
    maxLength: USER_LOGIN_ID_LENGTH.MAX,
  })
  loginId: string;

  @Exclude()
  password: string;

  @Exclude()
  deletedAt: Date | null;

  constructor(userDto: UserDto) {
    super();

    Object.assign(this, userDto);
  }
}
