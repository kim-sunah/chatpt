import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '../entities/payment.entity';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { AuthModule } from './../auth/auth.module';
import { Livecast } from 'src/entities/livecast.entity';
import { Message } from 'src/entities/message.entity';
import { MessageService } from 'src/message/message.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Payment, User, Product, Livecast, Message]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, MessageService],
})
export class PaymentModule {}
