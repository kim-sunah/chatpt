import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
//import { Delivery } from 'src/entities/delivery.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>
    ) {}
    async commentfind(productId: number): Promise<Comment[]> {
        const comments = await this.commentRepository.find({
            where: { product_id: productId },
        });
        if (comments.length === 0) {
            throw new NotFoundException('해당 제품의 댓글을 찾을 수 없습니다.');
        }
        return comments;
    }
    async comment(createCommentDto: CreateCommentDto, productId: number, userId: number): Promise<Comment> {
        const newComment = this.commentRepository.create({
            body: createCommentDto.comment,
            product_id: productId,
            user_id: userId,
        });
        const savedComment = await this.commentRepository.save(newComment);
        if (!savedComment) {
            throw new Error('댓글 작성 중 오류가 발생했습니다.');
        }
        return savedComment;
    }
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
        const updatedComment = await this.commentRepository.save(comment);
        if (!updatedComment) {
            throw new Error('댓글 수정 중 오류가 발생했습니다.');
        }
        return updatedComment;
    }
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
