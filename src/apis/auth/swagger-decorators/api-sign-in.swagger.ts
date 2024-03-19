import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import { SignInResponseDto } from '@src/apis/auth/dto/sign-in-response.dto';
import { COMMON_ERROR_HTTP_STATUS_CODE } from '@src/common/constants/common-error-http-status-code.enum';
import { COMMON_ERROR_HTTP_STATUS_MESSAGE } from '@src/common/constants/common-error-http-status-message.enum';
import { RESPONSE_KEY } from '@src/interceptors/response-transformer-interceptor/constants/response-key.enum';
import { ErrorSwaggerBuilder } from '@src/common/dto/error-swagger.builder';
import { InternalServerErrorSwaggerBuilder } from '@src/common/dto/internal-server-error.builder';

export const ApiSignIn = (summary: string) => {
  return applyDecorators(
    ApiOperation({
      summary,
    }),
    ApiCreatedResponse({
      description: '유저 로그인 API',
      schema: {
        properties: {
          [RESPONSE_KEY.TOKEN]: {
            $ref: getSchemaPath(SignInResponseDto),
          },
        },
      },
    }),
    ErrorSwaggerBuilder(
      COMMON_ERROR_HTTP_STATUS_CODE.NOT_FOUND,
      COMMON_ERROR_HTTP_STATUS_MESSAGE.NOT_FOUND,
    ),
    InternalServerErrorSwaggerBuilder(),
    ApiExtraModels(SignInResponseDto),
  );
};
