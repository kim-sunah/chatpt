import {
    Body,
    Query,
    Get,
    Post,
    Patch,
    Delete,
    Controller,
    UseGuards,
    Param,
    BadRequestException,
} from '@nestjs/common';
import { InquiryService } from './inquiry.service';
import { RoleGuard } from '../auth/guard/role.guard';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guards';
import { Role } from '../enum/Role';
import { Roles } from 'backend/src/auth/decorators/roles.decorator';
import { InquiryDto } from './dtos/inquiry.dto';
import { Id } from '../util/id';

@Controller('inquiry')
export class InquiryController {
    constructor(private readonly inquiryService: InquiryService) {}

    // 문의 목록
    @Get('all')
    async getInquiries() {
        return await this.inquiryService.getInquiries();
    }

    // 일반 문의 목록
    @Get('general')
    async getGeneralInquiry() {
        return await this.inquiryService.getInquiryByProductId(0);
    }

    // 상품별 문의 목록
    @Get('product/:id')
    async getInquiryByProductId(@Param() param: Id) {
        return await this.inquiryService.getInquiryByProductId(param.id);
    }
	
	// 문의 id로 찾기
	@Get('')
	async getInquiryById(@Query() query: Id){
		return await this.inquiryService.getInquiryById(query.id)
	}

    // 일반 문의 넣기
    @UseGuards(RoleGuard)
    @Roles(Role.Seller, Role.User)
    @Post('')
    async createGeneralInquiry(@Body() body: InquiryDto) {
        return await this.inquiryService.createInquiry(body.body);
    }

    // 상품 문의 넣기
    @UseGuards(RoleGuard)
    @Roles(Role.Seller, Role.User)
    @Post('product/:id')
    async createInquiry(@Body() body: InquiryDto, @Param() param: Id) {
        return await this.inquiryService.createInquiry(body.body, param.id);
    }

    // 내 문의 보기
    @UseGuards(RoleGuard)
    @Roles(Role.Seller, Role.User)
    @Get('my')
    async getMyInquiries() {
        return await this.inquiryService.getMyInquiries();
    }

    // 문의 답변하기
    @UseGuards(RoleGuard)
    @Post(':id')
    async replyInquiry(@Body() body: InquiryDto, @Param() param: Id) {
        return await this.inquiryService.replyInquiry(body.body, param.id);
    }
	
	// 문의별 답변 목록
	@Get(':id/replies')
	async getReplyByInquiryId(@Param() param: Id){
		return await this.inquiryService.getReplyByInquiryId(param.id)
	}

    // 문의 상태 바꾸기
    @UseGuards(RoleGuard)
    @Roles(Role.Admin)
    @Patch(':id')
    async updateStatus(@Body() body, @Param() param: Id) {
        const { status } = body;
        if ([0, 1, 2].indexOf(status) === -1) throw new BadRequestException('잘못된 요청입니다.');
        return await this.inquiryService.updateStatus(status, param.id);
    }

    // 문의 삭제
    @UseGuards(RoleGuard)
    @Delete(':id')
    async softDeleteInquiry(@Param() param: Id) {
        return await this.inquiryService.softDeleteInquiry(param.id);
    }
}
