import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { COMMON_ERROR_HTTP_STATUS_CODE } from '@src/common/constants/common-error-http-status-code.enum';
import { COMMON_ERROR_HTTP_STATUS_MESSAGE } from '@src/common/constants/common-error-http-status-message.enum';
import { RESPONSE_KEY } from '@src/common/constants/response-key.enum';
import { ErrorSwaggerBuilder } from '@src/common/dto/error-swagger.builder';

export const ApiGenerateAccessToken = (summary: string) => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary,
    }),
    ApiCreatedResponse({
      description: '액세스 토큰 재발급 성공',
      schema: {
        properties: {
          [RESPONSE_KEY.ACCESS_TOKEN]: {
            type: 'string',
          },
        },
      },
    }),
    ErrorSwaggerBuilder(
      COMMON_ERROR_HTTP_STATUS_CODE.UNAUTHORIZED,
      COMMON_ERROR_HTTP_STATUS_MESSAGE.UNAUTHORIZED,
    ),
  );
};
