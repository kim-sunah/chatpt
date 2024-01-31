import { Injectable, Inject, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Repository, QueryFailedError, IsNull } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import {Inquiry} from '../entities/inquiry.entity'
import {InquiryReply} from '../entities/inquiry-reply.entity'
import {Product} from '../entities/product.entity'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import {BadwordService} from '../badword/badword.service'

@Injectable()
export class InquiryService {
	constructor(
        @InjectRepository(Inquiry)
        private readonly inquiryRepository: Repository<Inquiry>,
		@InjectRepository(InquiryReply)
        private readonly inquiryReplyRepository: Repository<InquiryReply>,
		@InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
		private readonly badwordService: BadwordService,
		@Inject(REQUEST) private readonly req: Request
    ) {}
	
	// 문의 목록
	async getInquiries(page: number, pageSize: number){
		return await this.inquiryRepository.findAndCount({take: pageSize, skip:(page-1)*pageSize,relations:['product','user']})
	}
	
	// 상품별 문의 목록
	async getInquiryByProductId(product_id: number, page: number, pageSize: number){
		return await this.inquiryRepository.findAndCount({where:{product_id: product_id? product_id:IsNull()},take: pageSize, skip:(page-1)*pageSize,relations:['user']})
	}
	
	// id로 문의 찾기
	async getInquiryById(id: number){
		return await this.inquiryRepository.findOne({where:{id}})
	}
	
	// 문의 넣기
	async createInquiry(body: string, product_id: number | undefined = undefined){
		if(product_id){
			const product = await this.productRepository.findOne({where:{id:product_id}})
			if(!product) throw new NotFoundException('해당 상품을 찾을 수 없습니다.')
		}
		const badwords = await this.badwordService.searchBadword(body)
		if(badwords.length) throw new BadRequestException('적절하지 못한 단어가 들어있습니다: '+badwords.map(badword => badword[1][0]).join(', '))
		return await this.inquiryRepository.save({user_id:this.req.user['id'], product_id, body})
	}
	
	// 내 문의 보기
	async getMyInquiries(page: number, pageSize: number){
		return await this.inquiryRepository.findAndCount({where:{user_id:this.req.user['id']},take: pageSize, skip:(page-1)*pageSize,relations:['product']})
	}
	
	// 문의 답변하기
	async replyInquiry(body: string, inquiry_id: number){
		const inquiry = await this.getInquiryById(inquiry_id)
		if(!inquiry) throw new NotFoundException('해당 문의를 찾을 수 없습니다.')
		// 관리자, 문의 작성자, (상품 관련이면) 상품 등록자만 답변 가능
		if(this.req.user['role']==='Admin' || this.req.user['id']===inquiry.user_id || (inquiry.product_id && this.req.user['id']===(await this.productRepository.findOne({where:{id:inquiry.product_id}}))?.user_id)){
			const badwords = await this.badwordService.searchBadword(body)
			if(badwords.length) throw new BadRequestException('적절하지 못한 단어가 들어있습니다: '+badwords.map(badword => badword[1][0]).join(', '))
			return await this.inquiryReplyRepository.save({user_id:this.req.user['id'], inquiry_id, body})
		}
		throw new ForbiddenException('권한이 없습니다.')
	}
	
	// 문의별 답변 목록
	async getReplyByInquiryId(inquiry_id: number, page: number, pageSize: number){
		return await this.inquiryReplyRepository.findAndCount({where:{inquiry_id},take: pageSize,skip:(page-1)*pageSize,relations:['user']})
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
