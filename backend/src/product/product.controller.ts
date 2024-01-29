import {
    Body,
    Query,
    Get,
    Post,
    Patch,
    Delete,
    Controller,
    UseGuards,
    Param,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { SearchProductDto } from './dtos/search-product.dto';
import { PageDto } from './dtos/page.dto';
import { Id } from 'src/util/id';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ConfigService } from '@nestjs/config';
import { RoleGuard } from '../auth/guard/role.guard';
import { Role } from '../enum/Role';
import { Roles } from 'src/auth/decorators/roles.decorator';
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    // 수업 목록
    @Get('all')
    async getProducts(@Query() query: PageDto) {
        const { page, pageSize } = query;
        return await this.productService.getProducts(page, pageSize);
    }

    // 수업 검색 .......
    @Get('search')
    async searchProducts(@Query() query: SearchProductDto) {
        return await this.productService.searchProducts(query);
    }

    // 내가 등록한 수업 목록
    @UseGuards(RoleGuard)
    @Roles(Role.Host)
    @Get('my')
    async getMyProducts(@Query() query: PageDto) {
        return await this.productService.getMyProducts(query);
    }

    // 수업 id로 찾기
    @Get('')
    async getProductById(@Query() query: Id) {
        return await this.productService.getProductById(query.id);
    }

    // 수업 등록
    @UseGuards(RoleGuard)
    @Roles(Role.Admin)
    @Post('')
    async createProduct(@Body() body: CreateProductDto) {
        return await this.productService.createProduct(body);
    }

    // 수업 삭제
    @UseGuards(RoleGuard)
    @Roles(Role.Admin)
    @Delete(':id')
    async softDeleteProduct(@Param() param: Id) {
        await this.productService.softDeleteProduct(param.id);
    }

    // 수업 수정
    @UseGuards(RoleGuard)
    @Roles(Role.Admin)
    @Patch(':id')
    async updateProduct(@Param() param: Id, @Body() body: UpdateProductDto) {
        return await this.productService.updateProduct(param.id, body);
    }

    // 수업 썸네일 넣기/수정
    @UseGuards(RoleGuard)
    @Roles(Role.Admin)
    @Patch(':id/thumbnail')
    @UseInterceptors(FileInterceptor('image', {
		fileFilter: (req, file, callback) => {
			const allowedImageTypes = ['.jpg', '.jpeg', '.png']
			const ext = extname(file.originalname).toLowerCase()
			if (allowedImageTypes.includes(ext)) {
				callback(null, true)
			} else {
				callback(new Error('Only JPG, JPEG and PNG files are allowed'), false)
			}
		}
	}))
    async uploadThumbnail(@UploadedFile() image, @Param() param: Id) {
        return await this.productService.uploadThumbnail(param.id, image.location);
    }
	
	// 수업 쇼츠 넣기/ 수정
	@UseGuards(RoleGuard)
    @Roles(Role.Admin)
    @Patch(':id/shorts')
    @UseInterceptors(FileInterceptor('shorts', {
		fileFilter: (req, file, callback) => {
			const allowedImageTypes = ['.mp4', '.avi', '.mov', '.mkv']
			const ext = extname(file.originalname).toLowerCase()
			if (allowedImageTypes.includes(ext)) {
				callback(null, true)
			} else {
				callback(new Error('Only MP4, AVI, MOV, and MKV files are allowed'), false)
			}
		}
	}))
    async uploadShorts(@UploadedFile() shorts, @Param() param: Id) {
        return await this.productService.uploadShorts(param.id, shorts.location);
    }

    // 수업 이미지 넣기
    @UseGuards(RoleGuard)
    @Roles(Role.Admin)
    @Post(':id/image')
    @UseInterceptors(FileInterceptor('image', {
		fileFilter: (req, file, callback) => {
			const allowedImageTypes = ['.jpg', '.jpeg', '.png']
			const ext = extname(file.originalname).toLowerCase()
			if (allowedImageTypes.includes(ext)) {
				callback(null, true)
			} else {
				callback(new Error('Only JPG, JPEG and PNG files are allowed'), false)
			}
		}
	}))
    async uploadImage(@UploadedFile() image, @Param() param: Id) {
        return await this.productService.uploadImage(param.id, image.location);
    }

    // 수업 이미지 가져오기
    @Get(':id/image')
    async getImages(@Param() param: Id) {
        return await this.productService.getImages(param.id);
    }

    // 수업 이미지 지우기
    @UseGuards(RoleGuard)
    @Roles(Role.Admin)
    @Delete('image/:id')
    async softDeleteImage(@Param() param: Id) {
        return await this.productService.softDeleteImage(param.id);
    }
}
