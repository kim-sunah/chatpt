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
}
