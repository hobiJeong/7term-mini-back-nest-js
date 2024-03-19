import { Module } from '@nestjs/common';
import { ResponseTransformerInterceptor } from '@src/interceptors/response-transformer-interceptor/response-transformer.interceptor';

@Module({
  providers: [ResponseTransformerInterceptor],
})
export class ResponseTransformerInterceptorModule {}
