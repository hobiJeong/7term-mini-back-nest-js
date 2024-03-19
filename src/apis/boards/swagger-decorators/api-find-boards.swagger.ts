import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { FindBoardsPaginationResponseDto } from '@src/apis/boards/dto/find-boards-pagination-response.dto';
import { COMMON_ERROR_HTTP_STATUS_CODE } from '@src/common/constants/common-error-http-status-code.enum';
import { COMMON_ERROR_HTTP_STATUS_MESSAGE } from '@src/common/constants/common-error-http-status-message.enum';
import { ErrorSwaggerBuilder } from '@src/common/dto/error-swagger.builder';

export const ApiFindBoards = (summary: string): MethodDecorator => {
  return applyDecorators(
    ApiOperation({
      summary,
    }),
    ApiOkResponse({
      description: '성공적으로 게시글 전체 조회',
      type: FindBoardsPaginationResponseDto,
    }),
    ErrorSwaggerBuilder(
      COMMON_ERROR_HTTP_STATUS_CODE.BAD_REQUEST,
      COMMON_ERROR_HTTP_STATUS_MESSAGE.BAD_REQUEST,
    ),
    ApiExtraModels(FindBoardsPaginationResponseDto),
  );
};
