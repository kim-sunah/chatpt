import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Refund } from 'src/entities/refund.entity';
import { Payment } from 'src/entities/payment.entity';
import { CreateRefundDto } from './dto/create-refund.dto';

@Injectable()
export class RefundService {
    constructor(
        @InjectRepository(Refund)
        private readonly refundRepository: Repository<Refund>,
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>
    ) {}

    async createRefund(paymentId: number, amount: number, body?: string): Promise<Refund> {
        const payment = await this.paymentRepository.findOne({ where: { id: paymentId } });

        if (!payment) {
            throw new NotFoundException('결제를 찾을 수 없습니다.');
        }

        const existingRefund = await this.refundRepository.findOneBy({ payment });

        if (existingRefund) {
            throw new NotFoundException('이미 환불이 처리되었습니다.');
        }

        const refund = this.refundRepository.create({
            payment,
            amount,
            body,
        });

        return this.refundRepository.save(refund);
    }
}
