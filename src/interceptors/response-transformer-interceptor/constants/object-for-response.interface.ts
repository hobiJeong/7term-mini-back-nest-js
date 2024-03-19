import { RESPONSE_KEY } from '@src/interceptors/response-transformer-interceptor/constants/response-key.enum';
import { ResponseType } from '@src/interceptors/response-transformer-interceptor/constants/response-type.enum';

export interface ObjectForResponse {
  key: RESPONSE_KEY;
  type?: ResponseType;
}
