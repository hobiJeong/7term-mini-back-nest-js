import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { COMMON_ERROR_HTTP_STATUS_CODE } from '@src/common/constants/common-error-http-status-code.enum';
import { COMMON_ERROR_HTTP_STATUS_MESSAGE } from '@src/common/constants/common-error-http-status-message.enum';
import { ErrorSwaggerBuilder } from '@src/common/dto/error-swagger.builder';

export const ApiDeleteBoardComment = (summary: string): MethodDecorator => {
  return applyDecorators(
    ApiOperation({
      summary,
    }),
    ApiBearerAuth('access-token'),
    ApiNoContentResponse({
      description: '성공적으로 댓글 삭제',
    }),
    ErrorSwaggerBuilder(
      COMMON_ERROR_HTTP_STATUS_CODE.BAD_REQUEST,
      COMMON_ERROR_HTTP_STATUS_MESSAGE.BAD_REQUEST,
    ),
    ErrorSwaggerBuilder(
      COMMON_ERROR_HTTP_STATUS_CODE.UNAUTHORIZED,
      COMMON_ERROR_HTTP_STATUS_MESSAGE.UNAUTHORIZED,
    ),
    ErrorSwaggerBuilder(
      COMMON_ERROR_HTTP_STATUS_CODE.FORBIDDEN,
      COMMON_ERROR_HTTP_STATUS_MESSAGE.FORBIDDEN,
    ),
    ErrorSwaggerBuilder(
      COMMON_ERROR_HTTP_STATUS_CODE.NOT_FOUND,
      COMMON_ERROR_HTTP_STATUS_MESSAGE.NOT_FOUND,
    ),
  );
};
