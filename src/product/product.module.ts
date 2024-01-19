import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import {Product} from '../entities/product.entity'
import {ProductImage} from '../entities/product-image.entity'
import {Storage} from '../entities/storage.entity'
import {Comment} from '../entities/comment.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Product,ProductImage,Storage,Comment])],
	controllers: [ProductController],
	providers: [ProductService]
})
export class ProductModule {}
