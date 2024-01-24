import { Injectable, Inject, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Repository, QueryFailedError, IsNull } from 'typeorm'
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
	
	// 상품별 문의 목록
	async getInquiryByProductId(product_id: number){
		return await this.inquiryRepository.find({where:{product_id: product_id? product_id:IsNull()}})
	}
	
	// id로 문의 찾기
	async getInquiryById(id: number){
		return await this.inquiryRepository.findOne({where:{id}})
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
	
	// 내 문의 보기
	async getMyInquiries(){
		return await this.inquiryRepository.find({where:{user_id:this.req.user['id']}})
	}
	
	// 문의 답변하기
	async replyInquiry(body: string, inquiry_id: number){
		const inquiry = await this.getInquiryById(inquiry_id)
		if(!inquiry) throw new NotFoundException('해당 문의를 찾을 수 없습니다.')
		if(this.req.user['role']==='Admin' || this.req.user['id']===inquiry.user_id)
			return await this.inquiryReplyRepository.save({user_id:this.req.user['id'], inquiry_id, body})
		throw new ForbiddenException('권한이 없습니다.')
	}
	
	// 문의별 답변 목록
	async getReplyByInquiryId(inquiry_id: number){
		return await this.inquiryReplyRepository.find({where:{inquiry_id}})
	}
	
	// 문의 상태 바꾸기
	async updateStatus(status: number, id: number){
		try{
			return await this.inquiryRepository.update({id},{status})
		}catch(e){
			if(e instanceof QueryFailedError) throw new NotFoundException('해당 문의를 찾을 수 없습니다.')
			throw e
		}
	}
	
	// 문의 삭제
	async softDeleteInquiry(id: number){
		const inquiry = await this.getInquiryById(id)
		if(!inquiry) throw new NotFoundException('해당 문의를 찾을 수 없습니다.')
		if(this.req.user['role']==='Admin' || this.req.user['id']===inquiry.user_id)
			return await this.inquiryRepository.softDelete(id)
		throw new ForbiddenException('권한이 없습니다.')
	}
}
