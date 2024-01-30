import { Injectable, BadRequestException, Scope, Inject } from '@nestjs/common'
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
	
	async createWish(product_id: number){
		try{
			return await this.wishlistRepository.save({user_id:this.req.user['id'],product_id})
		}catch(e){
			if(e instanceof QueryFailedError) throw new BadRequestException('해당 강의가 존재하지 않거나 이미 찜한 강의입니다.')
		}
	}
}
