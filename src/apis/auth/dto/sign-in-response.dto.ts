import { PickType } from '@nestjs/swagger';
import { TokenDto } from '@src/apis/auth/token/dto/token.dto';

export class SignInResponseDto extends PickType(TokenDto, [
  'accessToken',
  'refreshToken',
]) {
  constructor(signInResponseDto: SignInResponseDto) {
    super();

    Object.assign(this, signInResponseDto);
  }
}
