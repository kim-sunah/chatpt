import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) { }

  async indexDocument(index: string, document: any): Promise<any> {
    const indexExists = await this.elasticsearchService.indices.exists({ index });
    if (!indexExists) {
      await this.elasticsearchService.indices.create({
        index,
        body: {
          mappings: {
            properties: {
              productname: {
                type: 'keyword',
              },
              Instructor_name: {
                type: 'keyword',
              },
              category: {
                type: 'keyword',
              },
              price: {
                type: "keyword"
              },
              sale_price: {
                type: "keyword"
              },
              start: {
                type: "keyword"
              },
              end: {
                type: "keyword"
              },
              startTime: {
                type: "keyword"
              },
              endTime: {
                type: "keyword"
              },
              thumbnail: {
                type: "keyword"
              }
            },
          },
        },
      });
    }
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
          bool: {
            should: [
              { wildcard: { productname: `*${query.name}*` } },
              { wildcard: { Instructor: `*${query.name}*` } },
              { wildcard: { descirption: `*${query.name}*` } },
            ],
            minimum_should_match: 1,
          },
        },
        size: 30,
        sort: [
          { productname: "desc" },
        ],
      },
    });



    if (result.hits.hits.length < 1) {
      throw new NotFoundException("검색한 상품에 일치하는 상품을 찾을수 없습니다.")

    }
    return result.hits.hits;
  }

  async categorysearchDocuments(index: string, query: any): Promise<any> {
    const result = await this.elasticsearchService.search({
      index,
      body: {
        query: {
          bool: {
            should: [
              { wildcard: { productname: `*${query.name}*` } },
              { wildcard: { Instructor: `*${query.name}*` } },
              { wildcard: { descirption: `*${query.name}*` } },

            ],
            must: [
              { match: { category: query.category } }
            ],
            minimum_should_match: 1,
          },
        },
        size: 30,
        sort: [
          { productname: "desc" },
        ],

      },
    });


    if (result.hits.hits.length < 1) {
      throw new NotFoundException("검색한 상품에 일치하는 상품을 찾을수 없습니다.")

    }
    return result.hits.hits;
  }

  //: Promise<string | null> 
  async getDocumentId(index: string, query: any , document :any) {
    try {
      const result = await this.elasticsearchService.search({
        index,
        body: {
          query: {
            match: { id: query }
          }
        }
      })
      console.log(result.hits.hits[0]._id)
      await this.elasticsearchService.update({
        index,
        id: result.hits.hits[0]._id,
        body: {doc: document }
      });
    } catch (error) {
      // Handle error
      console.error('Elasticsearch search error:', error);
      throw error;
    }
  }



  // async updateDocument(index: string, id: string, body: any): Promise<any> {
  //   try {
  //     const { body: response } = await this.elasticsearchService.update({
  //       index,
  //       id,
  //       body: {
  //         doc: body,
  //       },
  //     });
  //     return response;
  //   } catch (error) {
  //     // Handle error
  //     console.error('Elasticsearch update error:', error);
  //     throw error;
  //   }
  // }
}


