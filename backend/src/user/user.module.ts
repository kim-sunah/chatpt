import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { Product } from 'src/entities/product.entity';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3'
import { basename, extname } from 'path';




@Module({
    imports: [TypeOrmModule.forFeature([User, Product]), AuthModule, JwtModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}


