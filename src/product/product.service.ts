import { Injectable, NotFoundException, ForbiddenException, Scope, Inject } from '@nestjs/common';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import {Product} from '../entities/product.entity'
import {ProductImage} from '../entities/product-image.entity'
import {Storage} from '../entities/storage.entity'
import {Comment} from '../entities/comment.entity'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'

@Injectable({ scope: Scope.REQUEST })
export class ProductService {
	constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
		@InjectRepository(ProductImage)
        private readonly productImageRepository: Repository<ProductImage>,
		@Inject(REQUEST) private readonly req: Request
    ) {}
	
	// 상품 검색
	async getProducts(){
		return await this.productRepository.find()
	}
	
	// 상품 id로 찾기
	async getProductById(id: number){
		const res = await this.productRepository.findOne({where:{id}})
		if(!res) throw new NotFoundException('해당 상품을 찾을 수 없습니다.')
		return res
	}

	// 상품 등록
	async createProduct(body){
		body.sale_price = body.sale_price || body.price
		return await this.productRepository.save({...body, user_id:this.req.user['id']})
	}
	
	// 상품 삭제
	async softDeleteProduct(id: number){
		const product = await this.getProductById(id)
		if(product.user_id!==this.req.user['id']) throw new ForbiddenException('권한이 없습니다.')
		await this.productRepository.softDelete(id)
	}
	
	// 상품 수정
	async updateProduct(id: number, body){
		const product = await this.getProductById(id)
		if(product.user_id!==this.req.user['id']) throw new ForbiddenException('권한이 없습니다.')
		return await this.productRepository.save({id,...body})
	}
	
	// 내 상품 검색
	async getMyProducts(){
		return await this.productRepository.find({where:{user_id:this.req.user['id']}})
	}
	
	// 상품 이미지 넣기
	async uploadImage(product_id: number, original_url: string){
		const product = await this.getProductById(product_id)
		if(product.user_id!==this.req.user['id']) throw new ForbiddenException('권한이 없습니다.')
		return await this.productImageRepository.save({product_id, original_url})
	}
	
	// 상품 이미지 가져오기
	async getImages(product_id: number){
		return await this.productImageRepository.find({where:{product_id}})
	}
	
	// 상품 이미지 지우기
	async softDeleteImage(id: number){
		const image = await this.productImageRepository.findOne({where:{id}})
		if(!image) throw new NotFoundException('해당 이미지를 찾을 수 없습니다.')
		const product = await this.getProductById(image.product_id)
		if(product.user_id!==this.req.user['id']) throw new ForbiddenException('권한이 없습니다.')
		return await this.productImageRepository.softDelete(id)
	}
}
