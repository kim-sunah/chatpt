import { Injectable, NotFoundException } from '@nestjs/common';
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
    console.log(query)
    const result = await this.elasticsearchService.search({
      index,
      body: {
        query: {
          bool: {
            should: [
              { wildcard: { productname:`*${query.name}*` } },
              { wildcard: { Instructor_name:`*${query.name}*` } },
              { match: { category: query.category }},
            ],
            minimum_should_match: 2
          }
        },
        size: 30,
      },
    });
    
    if(result.hits.hits.length  < 1){
      throw new NotFoundException("검색 결과를 찾을 수 없습니다")
    }
    return result.hits.hits
    

    

   
  }
}
