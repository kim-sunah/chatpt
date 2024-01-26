"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("../entities/comment.entity");
let CommentService = class CommentService {
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }
    async commentfind(productId) {
        const comments = await this.commentRepository.find({
            where: { product_id: productId },
        });
        if (comments.length === 0) {
            throw new common_1.NotFoundException('해당 제품의 댓글을 찾을 수 없습니다.');
        }
        return comments;
    }
    async comment(createCommentDto, productId, userId) {
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
    async commentUpdate(userId, commentId, updateCommentDto) {
        const comment = await this.commentRepository.findOne({
            where: { id: commentId, user_id: userId },
        });
        if (!comment) {
            throw new common_1.NotFoundException('댓글을 찾을 수 없습니다.');
        }
        if (comment.user_id !== userId) {
            throw new common_1.UnauthorizedException('댓글을 수정할 권한이 없습니다.');
        }
        comment.body = updateCommentDto.comment;
        const updatedComment = await this.commentRepository.save(comment);
        if (!updatedComment) {
            throw new Error('댓글 수정 중 오류가 발생했습니다.');
        }
        return updatedComment;
    }
    async commentDelete(userId, commentId) {
        const comment = await this.commentRepository.findOne({
            where: { id: commentId, user_id: userId },
        });
        if (!comment) {
            throw new common_1.NotFoundException('댓글을 찾을 수 없습니다.');
        }
        if (comment.user_id !== userId) {
            throw new common_1.UnauthorizedException('댓글을 삭제할 권한이 없습니다.');
        }
        const deleteComment = await this.commentRepository.softRemove(comment);
        if (!deleteComment) {
            throw new Error('댓글 삭제 중 오류가 발생했습니다.');
        }
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CommentService);
//# sourceMappingURL=comment.service.js.map