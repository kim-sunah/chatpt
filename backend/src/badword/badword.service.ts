import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Badword } from '../entities/badword.entity'
import { Cron, CronExpression } from '@nestjs/schedule'	

@Injectable()
export class BadwordService {
	constructor(
		@InjectRepository(Badword) private readonly badwordRepository: Repository<Badword>
	){}
	
	private pollingInterval: number = 5000
	
	@Cron('*/5 * * * * *')
	handleInterval() {
		console.log('Called every 5 seconds');
	}
}
