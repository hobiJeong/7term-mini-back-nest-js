import { PickType } from '@nestjs/swagger';
import { CreateUserRequestBodyDto } from '@src/apis/users/dto/create-user-request-body.dto';

export class SignInRequestBodyDto extends PickType(CreateUserRequestBodyDto, [
  'loginId',
  'password',
]) {}
