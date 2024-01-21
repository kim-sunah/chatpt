import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import {User} from '../entities/user.entity'
import {Product} from '../entities/product.entity'
import {ProductImage} from '../entities/product-image.entity'
import {Storage} from '../entities/storage.entity'
import {Comment} from '../entities/comment.entity'
import {MulterModule} from '@nestjs/platform-express'
import { ConfigModule, ConfigService } from "@nestjs/config"
import { S3Client } from "@aws-sdk/client-s3"
import multerS3 from 'multer-s3'
import { basename, extname } from "path"
import {AuthModule} from '../auth/auth.module'

const multerOptionsFactory = (configService: ConfigService) => {
	return {
		storage: multerS3({
            s3: new S3Client({
                region: configService.get('S3_REGION'),
                credentials: {
                    accessKeyId: configService.get('S3_ACCESS_ID'),
                    secretAccessKey: configService.get('S3_SECRET_KEY')
                }
            }),
            bucket: configService.get('S3_BUCKET'),
          	//acl: 'public-read',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            metadata(req, file, callback) {
                callback(null, {owner: 'it'})
            },
            key(req, file, callback) {
                const ext = extname(file.originalname); // 확장자
                const baseName = basename(file.originalname, ext); // 확장자 제외
                // 파일이름-날짜.확장자
                const fileName = `images/${baseName}-${Date.now()}${ext}`
                callback(null, fileName)
            }
		}),
      // 파일 크기 제한
        limits: {
            fileSize: 2 * 1024 * 1024
        },
		fileFilter: (req: Request, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
            const allowedFileTypes = ['.jpg', '.jpeg', '.png'];
            const ext = extname(file.originalname).toLowerCase();
            if (allowedFileTypes.includes(ext)) {
                callback(null, true); // Accept the file
            } else {
                callback(new Error('Only JPG and PNG files are allowed'), false); // Reject the file
            }
        }
	}
}

@Module({
	imports: [
		TypeOrmModule.forFeature([Product,ProductImage,Storage,Comment,User]),
		MulterModule.registerAsync({
            imports: [ConfigModule],
            useFactory: multerOptionsFactory,
            inject: [ConfigService]
        }),
		AuthModule
	],
	controllers: [ProductController],
	providers: [ProductService]
})
export class ProductModule {}
