import { Module } from '@nestjs/common';
import { LivecastController } from './livecast.controller';
import { LivecastService } from './livecast.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import {Livecast} from '../entities/livecast.entity'
import {LiveComment} from '../entities/live-comment.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Livecast,LiveComment])],
    controllers: [LivecastController],
    providers: [LivecastService]
})
export class LivecastModule {}
