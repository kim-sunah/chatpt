import { Injectable, NotFoundException, ForbiddenException, Scope, Inject } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import {Livecast} from '../entities/livecast.entity'
import {LiveComment} from '../entities/live-comment.entity'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import {Product} from '../entities/product.entity'

@Injectable({ scope: Scope.REQUEST })
export class LivecastService {
	constructor(
        @InjectRepository(Livecast)
        private readonly livecastRepository: Repository<Livecast>,
		@InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
		@Inject(REQUEST) private readonly req: Request
    ) {}
	
	// 라이브 스케줄 등록
	async createLivecasts(product_id: number, schedules){
		const product = await this.productRepository.findOne({where:{id:product_id}})
		const host_id = this.req.user['id']
		if(product.user_id!==host_id) throw new ForbiddenException('권한이 없습니다.')
		return await this.livecastRepository.createQueryBuilder()
			.insert()
			.values(schedules.map(schedule => ({...schedule,host_id,product_id})))
			.execute()
	}
	
	// 라이브 스케줄 삭제
	async softDeleteLivecast(id: number){
		const livecast = await this.livecastRepository.findOne({where:{id}})
		if(!livecast) throw new NotFoundException('해당 스케줄을 찾을 수 없습니다.')
		if(livecast.host_id!==this.req.user['id']) throw new ForbiddenException('권한이 없습니다.')
		return await this.livecastRepository.softDelete(id)
	}
	
	// 강의별 스케줄 목록
	async getLivecastsByProduct(product_id: number, page: number, pageSize: number){
		return await this.livecastRepository.createQueryBuilder('livecast')
			.leftJoinAndSelect('livecast.product','product')
			.where(`livecast.product_id=${product_id}`)
			.take(pageSize)
			.skip((page - 1) * pageSize)
			.getManyAndCount() 
	}
	
	// 호스트별 스케줄 목록
	async getMyLivecasts(page: number, pageSize: number){
		return await this.livecastRepository.createQueryBuilder('livecast')
			.leftJoinAndSelect('livecast.product','product')
			.where(`livecast.host_id=${this.req.user['id']}`)
			.take(pageSize)
			.skip((page - 1) * pageSize)
			.getManyAndCount() 
	}
}
