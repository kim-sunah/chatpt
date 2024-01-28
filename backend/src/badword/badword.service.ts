import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Badword } from '../entities/badword.entity'
import { Cron, CronExpression } from '@nestjs/schedule'
import Redis from 'ioredis'

@Injectable()
export class BadwordService {
	private redisClient: Redis
	private badwordList: string[]

	constructor(
		@InjectRepository(Badword) private readonly badwordRepository: Repository<Badword>
	){
		this.redisClient = new Redis({
			host: 'localhost',
			port: 6379
		})
	}
	
	
	@Cron('*/10 * * * * *')
	async handleInterval() {
		console.log(new Date())
		if(await this.redisClient.get('updated')){
			console.log(await this.redisClient.get('badwords'))
			await this.redisClient.set('updated','')
		}
	}
	
	async cacheBadwords(){
		const badwords = await this.badwordRepository.find()
		await this.redisClient.set('badwords',JSON.stringify(badwords.map(badword => badword.badword)))
		await this.redisClient.set('updated','YES')
	}
	
	async createBadword(newBadwords: string[]){
		try{
			const res = await this.badwordRepository.createQueryBuilder()
				.insert()
				.values(newBadwords.map(badword => ({badword})))
				.orIgnore()
				.execute()
			if(res.raw.affectedRows) await this.cacheBadwords()
			return res
		}catch(e){throw e}
	}
}
