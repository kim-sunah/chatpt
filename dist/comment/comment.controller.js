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
exports.CommentController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const comment_service_1 = require("./comment.service");
const passport_1 = require("@nestjs/passport");
const userinfo_decorator_1 = require("../auth/decorators/userinfo.decorator");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guards_1 = require("../auth/guard/jwt-auth.guards");
const swcreate_comment_dto_1 = require("./dto/swcreate-comment.dto");
const swupdate_comment_dto_1 = require("./dto/swupdate-comment.dto");
const console_1 = require("console");
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    async commentfind(productId) {
        console.error('Error in commentfind:', console_1.error);
        return this.commentService.commentfind(productId);
    }
    async createComment(productId, createCommentDto, userId) {
        console.error('Error in createComment:', console_1.error);
        return this.commentService.comment(createCommentDto, productId, userId);
    }
    async commentUpdate(updateCommentDto, commentId, userId) {
        console.error('Error in commentUpdate:', console_1.error);
        return this.commentService.commentUpdate(userId, commentId, updateCommentDto);
    }
    async commentDelete(commentId, userId) {
        console.error('Error in commentDelete:', console_1.error);
        return this.commentService.commentDelete(userId, commentId);
    }
};
exports.CommentController = CommentController;
__decorate([
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    (0, common_1.UseGuards)(jwt_auth_guards_1.JwtAuthGuard),
    (0, common_1.Get)('product/:productId/comment'),
    openapi.ApiResponse({ status: 200, type: [require("../entities/comment.entity").Comment] }),
    __param(0, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "commentfind", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    (0, common_1.UseGuards)(jwt_auth_guards_1.JwtAuthGuard),
    (0, common_1.Post)(':productId'),
    openapi.ApiResponse({ status: 201, type: require("../entities/comment.entity").Comment }),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, userinfo_decorator_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, swcreate_comment_dto_1.SwCreateDto, Number]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "createComment", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    (0, common_1.UseGuards)(jwt_auth_guards_1.JwtAuthGuard),
    (0, common_1.Patch)(':commentId'),
    openapi.ApiResponse({ status: 200, type: require("../entities/comment.entity").Comment }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('commentId')),
    __param(2, (0, userinfo_decorator_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [swupdate_comment_dto_1.SwUpdateDto, Number, Number]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "commentUpdate", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('accessoken'),
    (0, common_1.UseGuards)(jwt_auth_guards_1.JwtAuthGuard),
    (0, common_1.Delete)(':commentId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('commentId')),
    __param(1, (0, userinfo_decorator_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "commentDelete", null);
exports.CommentController = CommentController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('comment'),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
//# sourceMappingURL=comment.controller.js.map