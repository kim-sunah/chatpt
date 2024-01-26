import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'backend/src/entities/user.entity';
import { Product } from 'backend/src/entities/product.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'backend/src/auth/auth.module';




@Module({
  imports : [TypeOrmModule.forFeature([User, Product]) , AuthModule, JwtModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
