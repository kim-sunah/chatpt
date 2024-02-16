import { Controller, Post, Get, Param, Query, UseGuards, Delete } from '@nestjs/common';
import { WishlistService } from './wishlist.service'
import { RoleGuard } from '../auth/guard/role.guard';
import { Role } from '../enum/Role';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Id } from 'src/util/id'
import { PageDto } from '../product/dtos/page.dto'
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guards';
import { UserInfo } from 'src/auth/decorators/userinfo.decorator';
import { User } from 'src/entities/user.entity';

 @UseGuards(RoleGuard)

@Controller('wishlist')
export class WishlistController {
	constructor(private readonly wishlistService: WishlistService) {}
	
	// 찜 등록
	// @Roles(Role.User)
	@Post(':id')
	async createWish(@Param() param: Id){
		return await this.wishlistService.createWish(param.id)
	}
	
	// 찜 삭제
	// @Roles(Role.User)
	@Delete(':id')
	async deleteWish(@Param() param: Id){
		return await this.wishlistService.deleteWish(param.id)
	}
	//찜 여부 확인
	@Get("/product/:id")
	async Wish(@Param() param: Id){
		return await this.wishlistService.Wish(param.id)
	}
	
	// 내 찜 목록
	// @Roles(Role.User)
	@Get('my')
	async getMyWish(){
	
		return await this.wishlistService.getMyWish()
	}
}
