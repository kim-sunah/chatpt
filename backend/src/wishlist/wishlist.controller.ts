import { Controller } from '@nestjs/common';
import { WishlistService } from './wishlist.service'
import { RoleGuard } from '../auth/guard/role.guard';
import { Role } from '../enum/Role';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('wishlist')
export class WishlistController {
	constructor(private readonly wishlistService: WishlistService) {}
	
	// 찜 등록
	
}
