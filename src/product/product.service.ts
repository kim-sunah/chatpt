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
	
	// 전체 상품 목록
	async getProducts(){
		return await this.productRepository.find()
	}
	
	// 쿼리 검색 문자열 만들기
	query(key, antiKey){
		const keyQuery = key.map(k => '+'+k).join(' ')
		const antiKeyQuery = antiKey.map(k => '-'+k).join(' ')
		return keyQuery+(antiKeyQuery? ' '+antiKeyQuery:'')
	}
	
	// 상품 검색
	async searchProducts(body){
		const {key, antiKey, minSalePrice, maxSalePrice, categories} = body
		const res = await this.productRepository
			.createQueryBuilder().select()
			.where(`match(name, body) against ('${this.query(key,antiKey)}' in boolean mode)`)
			.andWhere(`sale_price between ${minSalePrice} and ${maxSalePrice}`)
			.andWhere(`category in (${categories.map(c => `'${c}'`).join(',')})`)
			.getMany()
		return res
	}
	
	// 상품 id로 찾기
	async getProductById(id: number){
		const product = await this.productRepository.findOne({where:{id}})
		if(!product) throw new NotFoundException('해당 상품을 찾을 수 없습니다.')
		return product
	}
	
	// 상품 id로 찾고 등록자 확인
	async checkUploader(id: number){
		const product = await this.getProductById(id)
		if(product.user_id!==this.req.user['id']) throw new ForbiddenException('권한이 없습니다.')
		return product
	}

	// 상품 등록
	async createProduct(body){
		body.sale_price = body.sale_price || body.price
		return await this.productRepository.save({...body, user_id:this.req.user['id']})
	}
	
	// 상품 삭제
	async softDeleteProduct(id: number){
		await this.checkUploader(id)
		await this.productRepository.softDelete(id)
	}
	
	// 상품 수정
	async updateProduct(id: number, body){
		await this.checkUploader(id)
		return await this.productRepository.save({id,...body})
	}
	
	// 내가 등록한 상품 목록
	async getMyProducts(){
		return await this.productRepository.find({where:{user_id:this.req.user['id']}})
	}
	
	// 상품 썸네일 넣기/수정
	async uploadThumbnail(id: number, thumbnail: string){
		await this.checkUploader(id)
		return await this.productRepository.save({id, thumbnail})
	}
	
	// 상품 이미지 넣기
	async uploadImage(product_id: number, original_url: string){
		await this.checkUploader(product_id)
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
		await this.checkUploader(image.product_id)
		return await this.productImageRepository.softDelete(id)
	}
}
