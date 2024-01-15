import { Body, Get, Post, Patch, Delete, Controller, UseGuards, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import {ProductService} from './product.service'
import {CreateProductDto} from './dtos/create-product.dto'
import {UpdateProductDto} from './dtos/update-product.dto'
import {Id} from '../util/id'
import {FileInterceptor} from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	// 전체 상품 목록
	@Get('')
	async getProducts(){
		return await this.productService.getProducts()
	}
	
	// 아래 $는 나중에 host만 하게 추가
	
	// 상품 등록 $
	@Post('')
	async createProduct(@Body() body: CreateProductDto){
		return await this.productService.createProduct(body)
	}
	
	// 상품 삭제 $
	@Delete(':id')
	async softDeleteProduct(@Param() param: Id){
		await this.productService.softDeleteProduct(param.id)
	}
	
	// 상품 수정 $
	@Patch(':id')
	async updateProduct(@Param() param: Id, @Body() body: UpdateProductDto){
		return await this.productService.updateProduct(param.id, body)
	}
	
	// 내 상품 검색 $
	@Get('my')
	async getMyProducts(){
		return await this.productService.getMyProducts()
	}
	
	// 상품 이미지 넣기 $
	@Post(':id/image')
	@UseInterceptors(FileInterceptor('image',{
		// 나중에 s3 등으로 바꿔야
		storage: diskStorage({
			destination: './image',
			filename(_, file, callback): void {
				const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
				return callback(null, `${randomName}${extname(file.originalname)}`)
			}
		})
	}))
	async uploadImage(@UploadedFile() image: Express.Multer.File, @Param() param: Id){
		return await this.productService.uploadImage(param.id, image.path)
	}
	
	// 상품 이미지 가져오기
	@Get(':id/image')
	async getImages(@Param() param: Id){
		return await this.productService.getImages(param.id)
	}
	
	// 상품 이미지 지우기 $
	@Delete('image/:id')
	async softDeleteImage(@Param() param: Id){
		return await this.productService.softDeleteImage(param.id)
	}
}
