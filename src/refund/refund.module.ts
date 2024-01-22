import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefundController } from './refund.controller';
import { RefundService } from './refund.service';
import { Refund } from 'src/entities/refund.entity';
import { Payment } from 'src/entities/payment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Refund, Payment])],
    providers: [RefundService],
    controllers: [RefundController],
})
export class RefundModule {}
