import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Product } from 'src/entities/product.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { EventsGateway } from 'src/events/events.gateway';






@Module({
  imports : [TypeOrmModule.forFeature([User, Product]) , AuthModule, JwtModule  ],
  controllers: [AdminController],
  providers: [AdminService,EventsGateway],
})
export class AdminModule {}
