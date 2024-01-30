import { Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { WishlistService } from './wishlist.service'
import { RoleGuard } from '../auth/guard/role.guard';
import { Role } from '../enum/Role';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Id } from 'src/util/id'

@UseGuards(RoleGuard)
@Controller('wishlist')
export class WishlistController {
	constructor(private readonly wishlistService: WishlistService) {}
	
	// 찜 등록
	@Roles(Role.User)
	@Post(':id')
	async createWish(@Param() param: Id){
		return await this.wishlistService.createWish(param.id)
	}
}
