import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SET_RESPONSE_TOKEN } from '@src/interceptors/response-transformer-interceptor/constants/set-response.token';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseTransformerInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const key = this.reflector.get<string>(
          SET_RESPONSE_TOKEN,
          context.getHandler(),
        );

        return key ? { [key]: data } : data;
      }),
    );
  }
}
