import { Module } from '@nestjs/common';
import { QueryBuilderHelper } from '@src/helpers/providers/query-builder.helper';
import { QueryHelper } from '@src/helpers/providers/query.helper';

@Module({
  providers: [QueryHelper, QueryBuilderHelper],
  exports: [QueryHelper, QueryBuilderHelper],
})
export class HelpersModule {}
