import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { UserDto } from '@src/apis/users/dto/user.dto';
import { COMMON_ERROR_HTTP_STATUS_CODE } from '@src/common/constants/common-error-http-status-code.enum';
import { COMMON_ERROR_HTTP_STATUS_MESSAGE } from '@src/common/constants/common-error-http-status-message.enum';
import { RESPONSE_KEY } from '@src/interceptors/response-transformer-interceptor/constants/response-key.enum';
import { ErrorSwaggerBuilder } from '@src/common/dto/error-swagger.builder';

export const ApiFindOneUser = (summary: string): MethodDecorator => {
  return applyDecorators(
    ApiOperation({
      summary,
    }),
    ApiOkResponse({
      description: '유저 상세 조회',
      schema: {
        properties: {
          [RESPONSE_KEY.User]: {
            $ref: getSchemaPath(UserDto),
          },
        },
      },
    }),
    ErrorSwaggerBuilder(
      COMMON_ERROR_HTTP_STATUS_CODE.NOT_FOUND,
      COMMON_ERROR_HTTP_STATUS_MESSAGE.NOT_FOUND,
    ),
  );
};
