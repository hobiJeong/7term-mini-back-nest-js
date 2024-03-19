import { SetMetadata } from '@nestjs/common';
import { RESPONSE_KEY } from '@src/common/constants/response-key.enum';
import { SET_RESPONSE_TOKEN } from '@src/interceptors/response-transformer-interceptor/constants/set-response.token';

export const SetResponse = (key: RESPONSE_KEY): MethodDecorator =>
  SetMetadata(SET_RESPONSE_TOKEN, key);
