import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from 'src/entities/delivery.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports : [TypeOrmModule.forFeature([Delivery]),JwtModule, AuthModule],
  controllers: [DeliveryController],
  providers: [DeliveryService, JwtAuthGuard],
})
export class DeliveryModule {}
