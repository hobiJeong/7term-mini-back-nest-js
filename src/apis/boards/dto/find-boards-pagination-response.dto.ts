import { ApiProperty } from '@nestjs/swagger';
import { FindBoardsResponseDto } from '@src/apis/boards/dto/find-boards-response.dto';
import { RESPONSE_KEY } from '@src/interceptors/response-transformer-interceptor/constants/response-key.enum';
import { PaginationResponseDto } from '@src/interceptors/response-transformer-interceptor/dto/pagination-response.dto';

export class FindBoardsPaginationResponseDto extends PaginationResponseDto {
  @ApiProperty({
    description: '보드 pagination',
    type: [FindBoardsResponseDto],
  })
  [RESPONSE_KEY.Boards]: FindBoardsResponseDto[];
}
