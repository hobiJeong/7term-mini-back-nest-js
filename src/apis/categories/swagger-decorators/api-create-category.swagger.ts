import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import { CategoryDto } from '@src/apis/categories/dto/category.dto';
import { COMMON_ERROR_HTTP_STATUS_CODE } from '@src/common/constants/common-error-http-status-code.enum';
import { COMMON_ERROR_HTTP_STATUS_MESSAGE } from '@src/common/constants/common-error-http-status-message.enum';
import { ErrorSwaggerBuilder } from '@src/common/dto/error-swagger.builder';
import { RESPONSE_KEY } from '@src/interceptors/response-transformer-interceptor/constants/response-key.enum';

export const ApiCreateCategory = (summary: string) => {
  return applyDecorators(
    ApiOperation({
      summary,
    }),
    ApiBearerAuth('access-token'),
    ApiCreatedResponse({
      description: '카테고리 성공적으로 생성',
      schema: {
        properties: {
          [RESPONSE_KEY.Category]: {
            $ref: getSchemaPath(CategoryDto),
          },
        },
      },
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
      COMMON_ERROR_HTTP_STATUS_CODE.CONFLICT,
      COMMON_ERROR_HTTP_STATUS_MESSAGE.CONFLICT,
    ),
    ApiExtraModels(CategoryDto),
  );
};
