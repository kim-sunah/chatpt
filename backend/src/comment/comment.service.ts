import { Injectable, NotFoundException, UnauthorizedException, ConflictException, BadRequestException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {BadwordService} from '../badword/badword.service'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import {Product} from '../entities/product.entity'
import {Payment} from '../entities/payment.entity'

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>,
		@InjectRepository(Payment)
		private readonly paymentRepository: Repository<Payment>,
		private readonly badwordService: BadwordService,
		@Inject(REQUEST) private readonly req: Request
    ) {}

	// 강의별 리뷰 목록
    async commentfind(productId: number, page: number, pageSize: number){
        const comments = await this.commentRepository.findAndCount({
            where: { product_id: productId },
			take: pageSize, skip: (page-1)*pageSize, relations:['user']
        });
        if (comments[1] === 0) {
            throw new NotFoundException('해당 제품의 댓글을 찾을 수 없습니다.');
        }
        return comments;
    }
	
	// 내가 쓴 리뷰 목록
	async getMyComments(page: number, pageSize: number){
		return await this.commentRepository.findAndCount({where:{user_id:this.req.user['id']},take: pageSize, skip:(page-1)*pageSize,relations:['product']})
	}

	// 리뷰 쓰기
    async comment(createCommentDto: CreateCommentDto, productId: number, userId: number): Promise<Comment> {
		const product = await this.productRepository.findOne({where:{id:productId}})
		if(!product) throw new NotFoundException('해당 강의가 존재하지 않습니다.')
		const payment = await this.paymentRepository.findOne({where:{user_id:userId,product_id:productId}})
		if(!payment) throw new BadRequestException('구매한 강의에만 리뷰를 작성할 수 있습니다.')
		//if(new Date().toJSON().slice(0, 10)<=product.end_on.toJSON().slice(0,10)) throw new BadRequestException('리뷰는 종강일부터 작성 가능합니다.')
		if(await this.commentRepository.findOne({where:{user_id:userId,product_id:productId}})) throw new ConflictException('이미 리뷰한 강의입니다. 변경 사항이 있으시면 리뷰 내용을 수정하시기 바랍니다.')
		const badwords = await this.badwordService.searchBadword(createCommentDto.comment)
		if(badwords.length) throw new BadRequestException('적절하지 못한 단어가 들어있습니다: '+badwords.map(badword => badword[1][0]).join(', '))
        const newComment = this.commentRepository.create({
            body: createCommentDto.comment,
			rating: createCommentDto.rating,
            product_id: productId,
            user_id: userId,
        });
		
        const savedComment = await this.commentRepository.save(newComment);
        if (!savedComment) {
            throw new Error('댓글 작성 중 오류가 발생했습니다.');
        }
        return savedComment;
    }

	// 리뷰 수정
    async commentUpdate(userId: number, commentId: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
        const comment = await this.commentRepository.findOne({
            where: { id: commentId, user_id: userId },
        });
        if (!comment) {
            throw new NotFoundException('댓글을 찾을 수 없습니다.');
        }
        if (comment.user_id !== userId) {
            throw new UnauthorizedException('댓글을 수정할 권한이 없습니다.');
        }
        comment.body = updateCommentDto.comment;
		const badwords = await this.badwordService.searchBadword(comment.body)
		if(badwords.length) throw new BadRequestException('적절하지 못한 단어가 들어있습니다: '+badwords.map(badword => badword[1][0]).join(', '))
		comment.rating = updateCommentDto.rating
        const updatedComment = await this.commentRepository.save(comment);
        if (!updatedComment) {
            throw new Error('댓글 수정 중 오류가 발생했습니다.');
        }
        return updatedComment;
    }

	// 리뷰 삭제
    async commentDelete(userId: number, commentId: number): Promise<void> {
        const comment = await this.commentRepository.findOne({
            where: { id: commentId, user_id: userId },
        });
        if (!comment) {
            throw new NotFoundException('댓글을 찾을 수 없습니다.');
        }
        if (comment.user_id !== userId) {
            throw new UnauthorizedException('댓글을 삭제할 권한이 없습니다.');
        }
        const deleteComment = await this.commentRepository.softRemove(comment);
        if (!deleteComment) {
            throw new Error('댓글 삭제 중 오류가 발생했습니다.');
        }
    }
}
