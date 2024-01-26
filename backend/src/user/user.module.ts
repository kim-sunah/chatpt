import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { AuthModule } from 'backend/src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { Product } from 'backend/src/entities/product.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Product]), AuthModule, JwtModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
