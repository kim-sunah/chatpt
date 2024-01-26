import { Module } from '@nestjs/common';
import { CartlistController } from './cartlist.controller';
import { CartlistService } from './cartlist.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Cart } from '../entities/cart.entity'
import { Wishlist } from '../entities/wishlist.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Cart,Wishlist])],
    controllers: [CartlistController],
    providers: [CartlistService]
})
export class CartlistModule {}
