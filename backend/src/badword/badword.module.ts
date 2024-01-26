import { Module } from '@nestjs/common';
import { BadwordController } from './badword.controller';
import { BadwordService } from './badword.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Badword } from '../entities/badword.entity'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
	imports: [
		TypeOrmModule.forFeature([Badword]),
		ScheduleModule.forRoot()
	],
	controllers: [BadwordController],
	providers: [BadwordService]
})
export class BadwordModule {}
