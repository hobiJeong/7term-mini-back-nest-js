import { ApiProperty } from '@nestjs/swagger';
import { FindBoardCommentsResponseDto } from '@src/apis/board-comments/dto/find-board-comments-response.dto';
import { RESPONSE_KEY } from '@src/interceptors/response-transformer-interceptor/constants/response-key.enum';
import { PaginationResponseDto } from '@src/interceptors/response-transformer-interceptor/dto/pagination-response.dto';

export class FindBoardCommentsPaginationResponseDto extends PaginationResponseDto {
  @ApiProperty({
    description: '댓글 배열',
    type: [FindBoardCommentsResponseDto],
  })
  [RESPONSE_KEY.Comments]: FindBoardCommentsResponseDto[];
}
