import { applyDecorators } from '@nestjs/common';
import { ApiNoContentResponse, ApiOperation } from '@nestjs/swagger';
import { COMMON_ERROR_HTTP_STATUS_CODE } from '@src/common/constants/common-error-http-status-code.enum';
import { COMMON_ERROR_HTTP_STATUS_MESSAGE } from '@src/common/constants/common-error-http-status-message.enum';
import { ErrorSwaggerBuilder } from '@src/common/dto/error-swagger.builder';

export const ApiSignOut = (summary: string) => {
  return applyDecorators(
    ApiOperation({
      summary,
    }),
    ApiNoContentResponse({
      description: '로그아웃 성공',
    }),
    ErrorSwaggerBuilder(
      COMMON_ERROR_HTTP_STATUS_CODE.NOT_FOUND,
      COMMON_ERROR_HTTP_STATUS_MESSAGE.NOT_FOUND,
    ),
    ErrorSwaggerBuilder(
      COMMON_ERROR_HTTP_STATUS_CODE.UNAUTHORIZED,
      COMMON_ERROR_HTTP_STATUS_MESSAGE.UNAUTHORIZED,
    ),
  );
};
