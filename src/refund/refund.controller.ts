import { Body, Controller, NotFoundException, Param, Post } from '@nestjs/common';
import { RefundService } from './refund.service';
import { CreateRefundDto } from './dto/create-refund.dto';

@Controller('refund')
export class RefundController {
    constructor(private readonly refundService: RefundService) {}

    @Post(':paymentId')
    createRefund(@Param('paymentId') paymentId: number, @Body() createRefundDto: CreateRefundDto) {
        return this.refundService
            .createRefund(paymentId, createRefundDto.amount, createRefundDto.body)
            .then((refund) => ({ success: true, data: refund }))
            .catch((error) => {
                if (error instanceof NotFoundException) {
                    return { success: false, message: error.message };
                }
                throw error;
            });
    }
}
