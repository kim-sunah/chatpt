import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Badword } from '../entities/badword.entity'
import { Cron, CronExpression } from '@nestjs/schedule'
//import Redis from 'ioredis'
import AhoCorasick from 'ahocorasick'

@Injectable()
export class BadwordService {
	//private redisClient: Redis
	private ahoCorasick: AhoCorasick

	constructor(
		@InjectRepository(Badword) private readonly badwordRepository: Repository<Badword>
	){
		this.cacheBadwords()
		/* this.redisClient = new Redis({
			host: 'localhost',
			port: 6379
		}) */
	}
	
	// 폴링 굳이 없어도 될듯
	// @Cron('*/10 * * * * *')
	// async handleInterval() {
		// console.log(new Date())
		// if(await this.redisClient.get('updated')){
			// console.log(await this.redisClient.get('badwords'))
			// await this.redisClient.set('updated','')
		// }
	// }
	
	// 아호 코라식 업데이트
	async cacheBadwords(){
		const badwords = await this.badwordRepository.find()
		/* await this.redisClient.set('badwords',JSON.stringify(badwords.map(badword => badword.badword))) */
		this.ahoCorasick = new AhoCorasick(badwords.map(badword => badword.badword))
	}
	
	// 금칙어 검색
	searchBadword(text: string = ''){
		const body = ''
		return this.ahoCorasick.search(body)
	}
	
	// 금칙어 추가
	async createBadword(newBadwords: string[]){
		try{
			const res = await this.badwordRepository.createQueryBuilder()
				.insert()
				.values(newBadwords.map(badword => ({badword})))
				.orIgnore()
				.execute()
			//if(res.raw.affectedRows) 
				await this.cacheBadwords()
			return res
		}catch(e){throw e}
	}
}
