import { Injectable, BadRequestException, NotFoundException, ForbiddenException, Scope, Inject } from '@nestjs/common'
import { Repository, QueryFailedError } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import {Wishlist} from '../entities/wishlist.entity'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { EventsGateway } from 'src/events/events.gateway'
import { Product } from 'src/entities/product.entity'

@Injectable({scope: Scope.REQUEST})
export class WishlistService {
	constructor(
		@InjectRepository(Wishlist) private readonly wishlistRepository: Repository<Wishlist>,
		@InjectRepository(Product) private readonly ProducttRepository: Repository<Product>,
		@Inject(REQUEST) private readonly req: Request,
		private readonly event: EventsGateway
	){}
	
	// 찜 등록
	async createWish(product_id: number){
		const user_id = this.req.user['id']
		console.log(user_id , product_id)
		const wish = await this.wishlistRepository.findOne({where:{user_id,product_id}})
	
		this.event.GetwishList("LIKE")

		return await this.wishlistRepository.save({user_id,product_id})
	}
	
	// 찜 삭제
	async deleteWish(id: number){
		const wish = await this.wishlistRepository.findOne({where:{product_id : id}})
		console.log(wish)
		if(!wish) {
			throw new NotFoundException('찜하지 않은 강의입니다.')
		}
		
		// if(wish.user_id !==this.req.user['id']) {
		// 	throw new ForbiddenException('권한이 없습니다.')
		// }
		this.event.GetwishList("UNLIKE")
		await this.wishlistRepository.delete(wish.id)
	}
	//찜 여부 확인
	async Wish(product_id: number){
		const user_id = this.req.user['id']
		const wish = await this.wishlistRepository.findOne({where:{user_id,product_id}})
		if(wish){
			return true
		}
		return false;
	}
	
	// 내 찜 목록
	async getMyWish(){
		return await this.wishlistRepository.find({where : {user_id : this.req.user['id']},  relations:['product']})
		
		
		
	}
}
