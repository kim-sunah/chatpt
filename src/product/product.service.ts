import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import {Product} from '../entities/product.entity'
import {ProductImage} from '../entities/product-image.entity'
import {Storage} from '../entities/storage.entity'
import {Comment} from '../entities/comment.entity'

@Injectable()
export class ProductService {
	constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) {}
	
	// 상품 검색
	async searchProducts(){
		return await this.productRepository.find()
	}
	
	// 아래는 나중에 host만 하게 추가
	
	// 상품 등록
	async createProduct(body){
		body.sale_price = body.sale_price || body.price
		return await this.productRepository.save({...body, user_id:1})
	}
}
