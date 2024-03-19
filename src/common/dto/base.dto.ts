import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
  @ApiProperty({
    description: '고유 ID',
    type: 'integer',
    minimum: 1,
  })
  id: number;

  @ApiProperty({
    description: '생성일자',
    format: 'timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    description: '수정일자',
    format: 'timestamp',
  })
  updatedAt: Date;
}
