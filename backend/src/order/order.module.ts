import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import {Payment} from '../entities/payment.entity'
import {Refund} from '../entities/refund.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Payment,Refund])],
	controllers: [OrderController],
	providers: [OrderService]
})
export class OrderModule {}
