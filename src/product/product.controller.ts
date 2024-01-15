import { Body, Get, Post, Patch, Delete, Controller, UseGuards } from '@nestjs/common';
import {ProductService} from './product.service'
import {CreateProductDto} from './dtos/create-product.dto'

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
	//@Delete(':id')
	//async deleteProduct(@
}
