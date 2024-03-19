import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import { FindOneBoardResponseDto } from '@src/apis/boards/dto/find-one-board-response.dto';
import { COMMON_ERROR_HTTP_STATUS_CODE } from '@src/common/constants/common-error-http-status-code.enum';
import { COMMON_ERROR_HTTP_STATUS_MESSAGE } from '@src/common/constants/common-error-http-status-message.enum';
import { ErrorSwaggerBuilder } from '@src/common/dto/error-swagger.builder';
import { RESPONSE_KEY } from '@src/interceptors/response-transformer-interceptor/constants/response-key.enum';

export const ApiFindOneBoard = (summary: string) => {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiOkResponse({
      description: '게시글 상세 조회',
      schema: {
        properties: {
          [RESPONSE_KEY.Board]: {
            $ref: getSchemaPath(FindOneBoardResponseDto),
          },
        },
      },
    }),
    ErrorSwaggerBuilder(
      COMMON_ERROR_HTTP_STATUS_CODE.BAD_REQUEST,
      COMMON_ERROR_HTTP_STATUS_MESSAGE.BAD_REQUEST,
    ),
    ErrorSwaggerBuilder(
      COMMON_ERROR_HTTP_STATUS_CODE.NOT_FOUND,
      COMMON_ERROR_HTTP_STATUS_MESSAGE.NOT_FOUND,
    ),
    ApiExtraModels(FindOneBoardResponseDto),
  );
};
