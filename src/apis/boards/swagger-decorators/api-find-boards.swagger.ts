import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { FindBoardsPaginationResponseDto } from '@src/apis/boards/dto/find-boards-pagination-response.dto';

export const ApiFindBoards = (summary: string) => {
  return applyDecorators(
    ApiOperation({
      summary,
    }),
    ApiOkResponse({
      description: '성공적으로 게시글 전체 조회',
      type: FindBoardsPaginationResponseDto,
    }),
    ApiExtraModels(FindBoardsPaginationResponseDto),
  );
};
