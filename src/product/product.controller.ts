import { Body, Query, Get, Post, Patch, Delete, Controller, UseGuards, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import {ProductService} from './product.service'
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import {SearchProductDto} from './dtos/search-product.dto'
import {PageDto} from './dtos/page.dto'
import { Id } from 'src/util/id';
import {FileInterceptor} from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { ConfigService } from "@nestjs/config"
import { RoleGuard } from '../auth/guards/role.guard'
import { Role } from '../enum/role'
import { Roles } from 'src/auth/decorators/roles.decorator';
@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	// 상품 목록
	@Get('all')
	async getProducts(@Query() query: PageDto){
		const {page, pageSize} = query
		return await this.productService.getProducts(page,pageSize)
	}

	// 상품 검색
	@Get('search?')
	async searchProducts(@Query() query: SearchProductDto){
		return await this.productService.searchProducts(query)
	}

	// 내가 등록한 상품 목록
	@UseGuards(RoleGuard)
	@Roles(Role.Seller)
	@Get('my')
	async getMyProducts(){
		return await this.productService.getMyProducts()
	}

	// 상품 id로 찾기
	@Get('')
	async getProductById(@Query() query: Id){
		return await this.productService.getProductById(query.id)
	}

	// 상품 등록
	@UseGuards(RoleGuard)
	@Roles(Role.Seller)
	@Post('')
	async createProduct(@Body() body: CreateProductDto){
		return await this.productService.createProduct(body)
	}

	// 상품 삭제
	@UseGuards(RoleGuard)
	@Roles(Role.Seller)
	@Delete(':id')
	async softDeleteProduct(@Param() param: Id){
		await this.productService.softDeleteProduct(param.id)
	}

	// 상품 수정
	@UseGuards(RoleGuard)
	@Roles(Role.Seller)
	@Patch(':id')
	async updateProduct(@Param() param: Id, @Body() body: UpdateProductDto){
		return await this.productService.updateProduct(param.id, body)
	}

	// 상품 썸네일 넣기/수정
	@UseGuards(RoleGuard)
	@Roles(Role.Seller)
	@Patch(':id/thumbnail')
	@UseInterceptors(FileInterceptor('image'))
	async uploadThumbnail(@UploadedFile() image, @Param() param: Id){
		return await this.productService.uploadThumbnail(param.id, image.location)
	}

	// 상품 이미지 넣기
	@UseGuards(RoleGuard)
	@Roles(Role.Seller)
	@Post(':id/image')
	@UseInterceptors(FileInterceptor('image'))
	async uploadImage(@UploadedFile() image, @Param() param: Id){
		return await this.productService.uploadImage(param.id, image.location)
	}

	// 상품 이미지 가져오기 *
	@Get(':id/image')
	async getImages(@Param() param: Id){
		return await this.productService.getImages(param.id)
	}

	// 상품 이미지 지우기
	@UseGuards(RoleGuard)
	@Roles(Role.Seller)
	@Delete('image/:id')
	async softDeleteImage(@Param() param: Id){
		return await this.productService.softDeleteImage(param.id)
	}
}
