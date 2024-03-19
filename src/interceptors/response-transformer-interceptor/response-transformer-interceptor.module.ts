import { Module } from '@nestjs/common';
import { ResponseBuilder } from '@src/interceptors/response-transformer-interceptor/builders/response-transformer.builder';
import { ResponseTransformerInterceptor } from '@src/interceptors/response-transformer-interceptor/response-transformer.interceptor';

@Module({
  providers: [ResponseTransformerInterceptor, ResponseBuilder],
})
export class ResponseTransformerInterceptorModule {}
