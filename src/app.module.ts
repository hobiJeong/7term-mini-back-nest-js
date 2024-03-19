import { Module } from '@nestjs/common';
import { CoreModule } from '@src/core/core.module';
import { ApiModule } from '@src/apis/api.module';
import { InterceptorsModule } from '@src/interceptors/interceptors.module';

@Module({
  imports: [CoreModule, ApiModule, InterceptorsModule],
})
export class AppModule {}
