import { Module } from '@nestjs/common';
import { ResponseTransformerInterceptorModule } from '@src/interceptors/response-transformer-interceptor/response-transformer-interceptor.module';

@Module({
  imports: [ResponseTransformerInterceptorModule],
})
export class InterceptorsModule {}
