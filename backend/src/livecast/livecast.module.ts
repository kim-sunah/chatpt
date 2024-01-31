import { Module } from '@nestjs/common';
import { LivecastController } from './livecast.controller';
import { LivecastService } from './livecast.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import {Livecast} from '../entities/livecast.entity'
import {User} from '../entities/user.entity'
import {AuthModule} from '../auth/auth.module'
import {Product} from '../entities/product.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Livecast,User,Product]),AuthModule],
    controllers: [LivecastController],
    providers: [LivecastService]
})
export class LivecastModule {}
