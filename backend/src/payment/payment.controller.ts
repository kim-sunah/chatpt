import { Controller, Get, Post, Body, Param, UseGuards, HttpStatus, Request, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guards';
import { PaymentService } from './payment.service';
import { Role } from 'src/enum/Role';
import { CreatePaymentDto } from './dto/create.payment.dto';
import {Id} from '../util/id'
import { PageDto } from '../product/dtos/page.dto'

@ApiTags('강의 구매 정보')
@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

	// 구매하기
    @ApiBearerAuth()
    @Roles(Role.User)
    @UseGuards(RoleGuard)
    @Post()
    async create(@Request() req, @Body() createPaymentDto: CreatePaymentDto) {
        const userId = req.user.id;
        const payment = await this.paymentService.create(userId, createPaymentDto);

        return {
            statusCode: HttpStatus.CREATED,
            message: '강의 구매를 성공했습니다.',
            data: payment,
        };
    }
	
	// 인기 강의 찾기
	@Get('best')
	async getTopProducts(){
		return await this.paymentService.getTopProducts()
	}
	
	// 주어진 product_id 배열 안에서 인기 강의 찾기
	@Get('personalBest')
	async getPersonalTopProducts(@Query() query: any){
		return await this.paymentService.getPersonalTopProducts(query.key)
	}
	
	// 카테고리별 인기 강의 찾기
	@Get('categoryBest')
	async getCategoryTopProducts(@Query() query: any){
		return await this.paymentService.getCategoryTopProducts(query.category)
	}

	// 내 구매 목록
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('my')
    async findAll(@Request() req, @Query() query: PageDto) {
        const userId = req.user.id;
		const { page, pageSize } = query
        
       const payments = await this.paymentService.findAll(userId, page, pageSize);
        return {
            statusCode: HttpStatus.OK,
            message: '구매한 강의 목록 조회에 성공했습니다.',
            payments
        };
    }
	
	// 상품별 매출액
	@Get('revenue/:id')
	async getRevenue(@Param() param: Id){
		return await this.paymentService.getRevenue(param.id)
	}
	
	// 상품별 구매 목록
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async getByProduct(@Param() param: Id, @Query() query: PageDto){
		const { page, pageSize } = query
		return await this.paymentService.getByProduct(param.id, page, pageSize)
	}

	// 구매자+id 조합 찾기
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Request() req, @Param('id') id: number) {
        const userId = req.user.id;
        return this.paymentService.findOne(id, userId);
    }
}
