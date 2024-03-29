import { Module } from '@nestjs/common';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Wishlist } from '../entities/wishlist.entity'
import {User} from '../entities/user.entity'
import {AuthModule} from '../auth/auth.module'
import { EventsGateway } from 'src/events/events.gateway';
import { Product } from 'src/entities/product.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Wishlist,User,Product]),AuthModule],
	controllers: [WishlistController],
	providers: [WishlistService , EventsGateway]
})
export class WishlistModule {}
