import { Body, Get, Post, Patch, Delete, Controller, UseGuards, Param } from '@nestjs/common';
import {ProductService} from './product.service'
import {CreateProductDto} from './dtos/create-product.dto'
import {UpdateProductDto} from './dtos/update-product.dto'
import {Id} from '../util/id'

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	// 상품 검색
	@Get('')
	async searchProducts(){
		return await this.productService.searchProducts()
	}
	
	// 아래는 나중에 host만 하게 추가
	
	// 상품 등록
	@Post('')
	async createProduct(@Body() body: CreateProductDto){
		return await this.productService.createProduct(body)
	}
	
	// 상품 삭제
	@Delete(':id')
	async deleteProduct(@Param() param: Id){
		await this.productService.deleteProduct(param.id)
	}
	
	// 상품 수정
	@Patch(':id')
	async updateProduct(@Param() param: Id, @Body() body: UpdateProductDto){
		return await this.productService.updateProduct(param.id, body)
	}
}
