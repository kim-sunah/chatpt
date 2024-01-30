import { Module } from '@nestjs/common';
import { BadwordController } from './badword.controller';
import { BadwordService } from './badword.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Badword } from '../entities/badword.entity'
import { ScheduleModule } from '@nestjs/schedule'
import {AuthModule} from '../auth/auth.module'
import {User} from '../entities/user.entity'

@Module({
	imports: [
		TypeOrmModule.forFeature([Badword,User]),
		ScheduleModule.forRoot(),
		AuthModule
	],
	controllers: [BadwordController],
	providers: [BadwordService],
	exports: [BadwordService]
})
export class BadwordModule {}
