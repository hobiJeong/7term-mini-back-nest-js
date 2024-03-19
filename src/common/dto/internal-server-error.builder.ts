import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { COMMON_ERROR_HTTP_STATUS_CODE } from '@src/common/constants/common-error-http-status-code.enum';
import { COMMON_ERROR_HTTP_STATUS_MESSAGE } from '@src/common/constants/common-error-http-status-message.enum';

export const InternalServerErrorSwaggerBuilder = () => {
  return applyDecorators(
    ApiResponse({
      status: COMMON_ERROR_HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      schema: {
        properties: {
          error: {
            description: '500 error',
            type: 'string',
            example: COMMON_ERROR_HTTP_STATUS_MESSAGE.INTERNAL_SERVER_ERROR,
          },
          statusCode: {
            description: '500 error status code',
            type: 'number',
            example: COMMON_ERROR_HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
          },
        },
      },
    }),
  );
};
