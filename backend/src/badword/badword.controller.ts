import { Controller, Body, Get, Post, UseGuards } from '@nestjs/common'
import {BadwordService} from './badword.service'
import {BadwordDto} from './dtos/badword.dto'
import { RoleGuard } from '../auth/guard/role.guard';
import { Role } from '../enum/Role';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('badword')
export class BadwordController {
	constructor(private readonly badwordService: BadwordService) {}
	
	// 금칙어 추가
	@UseGuards(RoleGuard)
    @Roles(Role.Admin)
	@Post('add')
	async createBadword(@Body() body: BadwordDto){
		return await this.badwordService.createBadword(body.badwords)
	}
	
	// 금칙어 검색
	@Post('')
	searchBadword(@Body() body){
		if(body.body)
			return this.badwordService.searchBadword(body.body)
	}
}
