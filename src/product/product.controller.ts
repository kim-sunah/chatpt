import { Get, Post, Patch, Delete, Controller } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards'
import {ProductService} from './product.service'

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	// 상품 검색
	@Get('')
	async searchProducts(){
		return await this.productService.searchProducts()
	}
	
	
}
