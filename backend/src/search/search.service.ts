import { Injectable } from '@nestjs/common';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService : ElasticsearchService){}
  
  async indexDocument(index: string, document: any): Promise<any> {

    const result = await this.elasticsearchService.index({
      index,
      body: document,
    });

    return result;
  }

  async searchDocuments(index: string, query: any): Promise<any> {
 
    const result = await this.elasticsearchService.search({
      index,
      body: {
        query: {
          match: {
            name: query.name, 
          },
        },
      },
    });
    console.log(result.hits.hits[0]._source)

   
  }
}
