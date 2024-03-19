import { ApiProperty } from '@nestjs/swagger';
import {
  USER_EMAIL_LENGTH,
  USER_LOGIN_ID_LENGTH,
  USER_NICKNAME_LENGTH,
} from '@src/apis/users/constants/user.constant';
import { USER_PASSWORD_REGEXP } from '@src/apis/users/constants/user.regexp';
import { UserDto } from '@src/apis/users/dto/user.dto';
import { IsEmail, Length, Matches } from 'class-validator';

export class CreateUserRequestBodyDto
  implements Pick<UserDto, 'nickname' | 'loginId' | 'password' | 'email'>
{
  @ApiProperty({
    description: '유저 닉네임',
    minLength: USER_NICKNAME_LENGTH.MIN,
    maxLength: USER_NICKNAME_LENGTH.MAX,
  })
  @Length(USER_NICKNAME_LENGTH.MIN, USER_NICKNAME_LENGTH.MAX)
  nickname: string;

  @ApiProperty({
    description: '유저 이메일',
    format: 'email',
    minLength: USER_EMAIL_LENGTH.MIN,
    maxLength: USER_EMAIL_LENGTH.MAX,
  })
  @IsEmail()
  @Length(USER_EMAIL_LENGTH.MIN, USER_EMAIL_LENGTH.MAX)
  email: string;

  @ApiProperty({
    description: '유저 로그인 ID',
    minLength: USER_LOGIN_ID_LENGTH.MIN,
    maxLength: USER_LOGIN_ID_LENGTH.MAX,
  })
  @Length(USER_LOGIN_ID_LENGTH.MIN, USER_LOGIN_ID_LENGTH.MAX)
  loginId: string;

  @ApiProperty({
    description: '유저 패스워드',
    pattern: String(USER_PASSWORD_REGEXP),
  })
  @Matches(USER_PASSWORD_REGEXP)
  password: string;
}
