import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import { UserDto } from '@src/apis/users/dto/user.dto';
import { COMMON_ERROR_HTTP_STATUS_CODE } from '@src/common/constants/common-error-http-status-code.enum';
import { COMMON_ERROR_HTTP_STATUS_MESSAGE } from '@src/common/constants/common-error-http-status-message.enum';
import { RESPONSE_KEY } from '@src/common/constants/response-key.enum';
import { ErrorSwaggerBuilder } from '@src/common/dto/error-swagger.builder';

export const ApiCreateUser = (summary: string) => {
  return applyDecorators(
    ApiOperation({
      summary,
    }),
    ApiCreatedResponse({
      description: '유저 생성 성공',
      schema: {
        properties: {
          [RESPONSE_KEY.USER]: {
            $ref: getSchemaPath(UserDto),
          },
        },
      },
    }),
    ErrorSwaggerBuilder(
      COMMON_ERROR_HTTP_STATUS_CODE.BAD_REQUEST,
      COMMON_ERROR_HTTP_STATUS_MESSAGE.BAD_REQUEST,
    ),
    ErrorSwaggerBuilder(
      COMMON_ERROR_HTTP_STATUS_CODE.CONFLICT,
      COMMON_ERROR_HTTP_STATUS_MESSAGE.CONFLICT,
    ),
    ApiExtraModels(UserDto),
    ApiExtraModels(),
  );
};
