import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository, QueryFailedError } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import {Inquiry} from '../entities/inquiry.entity'
import {InquiryReply} from '../entities/inquiry-reply.entity'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'

@Injectable()
export class InquiryService {
	constructor(
        @InjectRepository(Inquiry)
        private readonly inquiryRepository: Repository<Inquiry>,
		@InjectRepository(InquiryReply)
        private readonly inquiryReplyRepository: Repository<InquiryReply>,
		@Inject(REQUEST) private readonly req: Request
    ) {}
	
	// 문의 목록
	async getInquiries(){
		return await this.inquiryRepository.find()
	}
	
	// 문의 넣기
	async createInquiry(body: string, product_id: number | undefined = undefined){
		try{
			return await this.inquiryRepository.save({user_id:this.req.user['id'], product_id, body})
		}catch(e){
			if(e instanceof QueryFailedError) throw new NotFoundException('해당 상품을 찾을 수 없습니다.')
			throw e
		}
	}
}
