import { Module } from '@nestjs/common';
import { SearchService } from './search.service';

import { ElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://localhost:9200', // Elasticsearch 서버 주소
    }),
  ],

  providers: [SearchService],
  exports : [SearchService]
})
export class SearchModule {}
