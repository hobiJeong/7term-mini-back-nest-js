import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { COMMON_ERROR_HTTP_STATUS_CODE } from '@src/common/constants/common-error-http-status-code.enum';
import { COMMON_ERROR_HTTP_STATUS_MESSAGE } from '@src/common/constants/common-error-http-status-message.enum';

export const ErrorSwaggerBuilder = (
  statusCode: COMMON_ERROR_HTTP_STATUS_CODE,
  error: COMMON_ERROR_HTTP_STATUS_MESSAGE,
  message?: string[],
): ClassDecorator & MethodDecorator => {
  return applyDecorators(
    ApiResponse({
      status: statusCode,
      schema: {
        properties: {
          message: {
            type:
              statusCode === COMMON_ERROR_HTTP_STATUS_CODE.BAD_REQUEST
                ? 'array'
                : 'string',
            items: {
              type: 'string',
              example: message ? message?.join(', ') : 'string',
            },
          },
          error: {
            description: '에러 종류',
            type: 'string',
            enum: [COMMON_ERROR_HTTP_STATUS_MESSAGE],
            example: error,
          },
          statusCode: {
            description: '400번대 http status code',
            type: 'number',
            enum: [COMMON_ERROR_HTTP_STATUS_CODE],
            example: statusCode,
          },
        },
      },
    }),
  );
};
