import { Controller, Get, Post, Body, Param, UseGuards, HttpStatus, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guards';
import { PaymentService } from './payment.service';
import { Role } from 'src/enum/Role';
import { CreatePaymentDto } from './dto/create.payment.dto';

@ApiTags('강의 구매 정보')
@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

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

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Request() req) {
        const userId = req.user.id;
        const payments = await this.paymentService.findAll(userId);

        return {
            statusCode: HttpStatus.OK,
            message: '구매한 강의 목록 조회에 성공했습니다.',
            data: payments,
        };
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Request() req, @Param('id') id: number) {
        const userId = req.user.id;
        return this.paymentService.findOne(id, userId);
    }
}
