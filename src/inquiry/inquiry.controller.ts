import { Body, Query, Get, Post, Patch, Delete, Controller, UseGuards, Param } from '@nestjs/common'
import {InquiryService} from './inquiry.service'
import { RoleGuard } from '../auth/guards/role.guard'
import { Role } from '../enum/role'
import { Roles } from 'src/auth/decorators/roles.decorator'
import {InquiryDto} from './dtos/inquiry.dto'
import {Id} from '../util/id'

@Controller('inquiry')
export class InquiryController {
	constructor(private readonly inquiryService: InquiryService) {}
	
	// 문의 목록
	@Get('all')
	async getInquiries(){
		return await this.inquiryService.getInquiries()
	}
	
	// 일반 문의 넣기
	@UseGuards(RoleGuard)
    @Roles(Role.Seller,Role.User)
	@Post('')
	async createGeneralInquiry(@Body() body: InquiryDto){
		return await this.inquiryService.createInquiry(body.body)
	}
	
	// 상품 문의 넣기
	@UseGuards(RoleGuard)
    @Roles(Role.Seller,Role.User)
	@Post('product/:id')
	async createInquiry(@Body() body: InquiryDto, @Param() param: Id){
		return await this.inquiryService.createInquiry(body.body, param.id)
	}
}
