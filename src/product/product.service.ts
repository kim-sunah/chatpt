import { Injectable, NotFoundException } from '@nestjs/common';
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
        private readonly productRepository: Repository<Product>,
		@InjectRepository(ProductImage)
        private readonly productImageRepository: Repository<ProductImage>
    ) {}
	
	// 상품 검색
	async getProducts(){
		return await this.productRepository.find()
	}
	
	// 상품 id로 찾기
	async getProductById(id: number){
		return await this.productRepository.findOne({where:{id}})
	}
	
	// 아래 $$는 나중에 user_id 비교 추가
	
	// 상품 등록
	async createProduct(body){
		body.sale_price = body.sale_price || body.price
		return await this.productRepository.save({...body, user_id:3})
	}
	
	// 상품 삭제 $$
	async softDeleteProduct(id: number){
		await this.productRepository.softDelete(id)
	}
	
	// 상품 수정 $$
	async updateProduct(id: number, body){
		await this.productRepository.update(id,{...body})
		const res = this.getProductById(id)
		if(!res) throw new NotFoundException('해당 상품을 찾을 수 없습니다.')
		return res
	}
	
	// 내 상품 검색
	async getMyProducts(){
		return await this.productRepository.find({where:{user_id:1}})
	}
	
	// 상품 이미지 넣기 $$
	async uploadImage(product_id: number, original_url: string){
		if(!this.getProductById(product_id)) throw new NotFoundException('해당 상품을 찾을 수 없습니다.') 
		return await this.productImageRepository.save({product_id, original_url})
	}
	
	// 상품 이미지 가져오기
	async getImages(product_id: number){
		return await this.productImageRepository.find({where:{product_id}})
	}
	
	// 상품 이미지 지우기 $$
	async softDeleteImage(id: number){
		return await this.productImageRepository.softDelete(id)
	}
}
