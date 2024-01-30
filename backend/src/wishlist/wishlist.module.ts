import { Module } from '@nestjs/common';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Wishlist } from '../entities/wishlist.entity'
import {User} from '../entities/user.entity'
import {AuthModule} from '../auth/auth.module'

@Module({
	imports: [TypeOrmModule.forFeature([Wishlist,User]),AuthModule],
	controllers: [WishlistController],
	providers: [WishlistService]
})
export class WishlistModule {}
