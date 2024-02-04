import { Module } from '@nestjs/common';
import { SearchService } from './search.service';

import { ElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: "http://43.202.194.220:9200/"
    }),
  ],

  providers: [SearchService],
  exports : [SearchService]
})
export class SearchModule {}
