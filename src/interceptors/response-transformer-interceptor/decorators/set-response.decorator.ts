import { SetMetadata } from '@nestjs/common';
import { RESPONSE_KEY } from '@src/interceptors/response-transformer-interceptor/constants/response-key.enum';
import { SET_RESPONSE_TOKEN } from '@src/interceptors/response-transformer-interceptor/constants/set-response.token';
import { ResponseType } from '@src/interceptors/response-transformer-interceptor/constants/response-type.enum';

export const SetResponse = (
  key: RESPONSE_KEY,
  type?: ResponseType,
): MethodDecorator => SetMetadata(SET_RESPONSE_TOKEN, { key, type });
