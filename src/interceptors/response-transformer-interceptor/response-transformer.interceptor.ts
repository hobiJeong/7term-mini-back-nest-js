import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PageQueryDto } from '@src/common/dto/page-query.dto';
import { ResponseBuilder } from '@src/interceptors/response-transformer-interceptor/builders/response-transformer.builder';
import { ObjectForResponse } from '@src/interceptors/response-transformer-interceptor/constants/object-for-response.interface';
import { ResponseType } from '@src/interceptors/response-transformer-interceptor/constants/response-type.enum';
import { SET_RESPONSE_TOKEN } from '@src/interceptors/response-transformer-interceptor/constants/set-response.token';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseTransformerInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly responseBuilder: ResponseBuilder,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const objectForResponse = this.reflector.get<ObjectForResponse>(
          SET_RESPONSE_TOKEN,
          context.getHandler(),
        );

        if (!objectForResponse?.key) {
          return data;
        }

        const { key } = objectForResponse;

        if (objectForResponse.type === ResponseType.Pagination) {
          const request = context.switchToHttp().getRequest();

          const { page, pageSize }: PageQueryDto = request.query;

          return this.responseBuilder.pagination(
            { data, key },
            { page, pageSize },
          );
        }

        return key ? { [key]: data } : data;
      }),
    );
  }
}
