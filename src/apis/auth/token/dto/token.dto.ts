import { ApiProperty, OmitType } from '@nestjs/swagger';
import { BaseDto } from '@src/common/dto/base.dto';
import { Token } from '@src/entities/Token';

export class TokenDto
  extends OmitType(BaseDto, ['updatedAt'])
  implements Pick<Token, 'id' | 'userId' | 'accessToken' | 'refreshToken'>
{
  @ApiProperty({
    description: '유저 고유 ID',
    format: 'integer',
    minimum: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'access token',
  })
  accessToken: string;

  @ApiProperty({
    description: 'refresh token',
  })
  refreshToken: string;
}
