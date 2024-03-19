import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { FindBoardCommentsPaginationResponseDto } from '@src/apis/board-comments/dto/find-board-comments-paignation-response.dto';
import { COMMON_ERROR_HTTP_STATUS_CODE } from '@src/common/constants/common-error-http-status-code.enum';
import { COMMON_ERROR_HTTP_STATUS_MESSAGE } from '@src/common/constants/common-error-http-status-message.enum';
import { ErrorSwaggerBuilder } from '@src/common/dto/error-swagger.builder';

export const ApiFindBoardComments = (summary: string): MethodDecorator => {
  return applyDecorators(
    ApiOperation({
      summary,
    }),
    ApiOkResponse({
      description: '성공적으로 댓글 전체 조회(pagination)',
      type: FindBoardCommentsPaginationResponseDto,
    }),
    ErrorSwaggerBuilder(
      COMMON_ERROR_HTTP_STATUS_CODE.BAD_REQUEST,
      COMMON_ERROR_HTTP_STATUS_MESSAGE.BAD_REQUEST,
    ),
    ErrorSwaggerBuilder(
      COMMON_ERROR_HTTP_STATUS_CODE.NOT_FOUND,
      COMMON_ERROR_HTTP_STATUS_MESSAGE.NOT_FOUND,
    ),
    ApiExtraModels(FindBoardCommentsPaginationResponseDto),
  );
};
