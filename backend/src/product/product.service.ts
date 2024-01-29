import { Injectable, BadRequestException, NotFoundException, ForbiddenException, Scope, Inject } from '@nestjs/common';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import {Product} from '../entities/product.entity'
import {SearchProductDto} from './dtos/search-product.dto'
import {ProductImage} from '../entities/product-image.entity'
import {Comment} from '../entities/comment.entity'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { User } from '../entities/user.entity'

@Injectable({ scope: Scope.REQUEST })
export class ProductService {
	constructor(
		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>,
		@InjectRepository(ProductImage)
		private readonly productImageRepository: Repository<ProductImage>,
		@InjectRepository(User)
        private readonly userRepository: Repository<User>,
		@Inject(REQUEST) private readonly req: Request
	) {}

	// 수업 목록
	async getProducts(page: number, pageSize: number){
		return await this.productRepository.find({take: pageSize, skip:(page-1)*pageSize})
	}

	// 쿼리 검색 문자열 만들기
	query(key, antiKey){
		const keyQuery = key.split(' ').map(k => '+'+k).join(' ')
		const antiKeyQuery = antiKey? antiKey.split(' ').map(k => '-'+k).join(' '):''
		return keyQuery+(antiKeyQuery? ' '+antiKeyQuery:'')
	}

	// 카테고리 비트 풀기
	categoryArray(categories){
		const arr = []
		for(let i=0,j=1;i<10;++i,j*=2)
			if(categories&j) arr.push(i)
		return arr
	}

	// 수업 검색
	async searchProducts(query){
		const {page, pageSize, key, antiKey, minSalePrice, maxSalePrice, categories} = query
		return await this.productRepository
			.createQueryBuilder().select()
			.where(`match(name, body) against ('${this.query(key,antiKey)}' in boolean mode)`)
			.andWhere(`sale_price between ${minSalePrice} and ${maxSalePrice}`)
			.andWhere(`category in (${this.categoryArray(categories).map(c => `'${c}'`).join(',')})`)
			.take(pageSize).skip((page-1)*pageSize)
			.getManyAndCount()
	}

	// 수업 id로 찾기
	async getProductById(id: number){
		const product = await this.productRepository.findOne({where:{id}})
		if(!product) throw new NotFoundException('해당 수업을 찾을 수 없습니다.')
		return product
	}

	// 수업 id로 찾고 등록자 확인
	async checkUploader(id: number){
		const product = await this.getProductById(id)
		if(product.user_id!==this.req.user['id']) throw new ForbiddenException('권한이 없습니다.')
		return product
	}

	// 수업 등록
	async createProduct(body){
		const user = await this.userRepository.findOne({where:{id:body.user_id}})
		if(!user) throw new NotFoundException('해당 유저가 존재하지 않습니다.')
		if(user.authority!=='Host') throw new BadRequestException('해당 유저의 등급이 호스트가 아닙니다.')
		body.sale_price = body.sale_price || body.price
		body.vacancy = body.capacity
		return await this.productRepository.save({...body,host_name:user.nickname})
	}

	// 수업 삭제
	async softDeleteProduct(id: number){
		await this.productRepository.softDelete(id)
	}

	// 수업 수정
	async updateProduct(id: number, body){
		return await this.productRepository.save({id,...body})
	}

	// 내가 등록한 수업 목록
	async getMyProducts(query){
		const {page,pageSize} = query
		return await this.productRepository.findAndCount({where:{user_id:this.req.user['id']}, take:pageSize, skip:(page-1)*pageSize})
	}

	// 수업 썸네일 넣기/수정
	async uploadThumbnail(id: number, thumbnail: string){
		return await this.productRepository.save({id, thumbnail})
	}
	
	// 수업 쇼츠 넣기/수정
	async uploadShorts(id: number, shorts: string){
		return await this.productRepository.save({id, shorts})
	}

	// 수업 이미지 넣기
	async uploadImage(product_id: number, original_url: string){
		return await this.productImageRepository.save({product_id, original_url})
	}

	// 수업 이미지 가져오기
	async getImages(product_id: number){
		return await this.productImageRepository.find({where:{product_id}})
	}

	// 수업 이미지 지우기
	async softDeleteImage(id: number){
		return await this.productImageRepository.softDelete(id)
	}
}
