import { Injectable, BadRequestException, ForbiddenException, Scope, Inject } from '@nestjs/common'
import { Repository, QueryFailedError } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import {Wishlist} from '../entities/wishlist.entity'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'

@Injectable({scope: Scope.REQUEST})
export class WishlistService {
	constructor(
		@InjectRepository(Wishlist) private readonly wishlistRepository: Repository<Wishlist>,
		@Inject(REQUEST) private readonly req: Request
	){}
	
	// 찜 등록
	async createWish(product_id: number){
		const queryBuilder = this.wishlistRepository.createQueryBuilder()
		return await queryBuilder.insert()
			.values([{user_id:this.req.user['id'],product_id,deletedAt:null}])
			.orUpdate(['user_id','product_id'],['deletedAt'])
			.execute()
	}
	
	// 찜 삭제
	async deleteWish(id: number){
		const wish = await this.wishlistRepository.findOne({where:{id}})
		if(wish.user_id!==this.req.user['id']) throw new ForbiddenException('권한이 없습니다.')
		await this.wishlistRepository.softDelete(id)
	}
	
	// 내 찜 목록
	async getMyWish(page: number, pageSize: number){
		return await this.wishlistRepository.createQueryBuilder('wishlist')
			.leftJoinAndSelect('wishlist.product','product')
			.where(`wishlist.user_id=${this.req.user['id']}`)
			.take(pageSize)
			.skip((page - 1) * pageSize)
			.getManyAndCount()
	}
}
