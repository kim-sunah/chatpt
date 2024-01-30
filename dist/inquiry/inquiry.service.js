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
exports.InquiryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const inquiry_entity_1 = require("../entities/inquiry.entity");
const inquiry_reply_entity_1 = require("../entities/inquiry-reply.entity");
const product_entity_1 = require("../entities/product.entity");
const core_1 = require("@nestjs/core");
let InquiryService = class InquiryService {
    constructor(inquiryRepository, inquiryReplyRepository, productRepository, req) {
        this.inquiryRepository = inquiryRepository;
        this.inquiryReplyRepository = inquiryReplyRepository;
        this.productRepository = productRepository;
        this.req = req;
    }
    async getInquiries() {
        return await this.inquiryRepository.find();
    }
    async getInquiryByProductId(product_id) {
        return await this.inquiryRepository.find({ where: { product_id: product_id ? product_id : (0, typeorm_1.IsNull)() } });
    }
    async getInquiryById(id) {
        return await this.inquiryRepository.findOne({ where: { id } });
    }
    async createInquiry(body, product_id = undefined) {
        try {
            return await this.inquiryRepository.save({ user_id: this.req.user['id'], product_id, body });
        }
        catch (e) {
            if (e instanceof typeorm_1.QueryFailedError)
                throw new common_1.NotFoundException('해당 상품을 찾을 수 없습니다.');
            throw e;
        }
    }
    async getMyInquiries() {
        return await this.inquiryRepository.find({ where: { user_id: this.req.user['id'] } });
    }
    async replyInquiry(body, inquiry_id) {
        const inquiry = await this.getInquiryById(inquiry_id);
        if (!inquiry)
            throw new common_1.NotFoundException('해당 문의를 찾을 수 없습니다.');
        if (this.req.user['role'] === 'Admin' || this.req.user['id'] === inquiry.user_id || (inquiry.product_id && this.req.user['id'] === (await this.productRepository.findOne({ where: { id: inquiry.product_id } }))?.user_id))
            return await this.inquiryReplyRepository.save({ user_id: this.req.user['id'], inquiry_id, body });
        throw new common_1.ForbiddenException('권한이 없습니다.');
    }
    async getReplyByInquiryId(inquiry_id) {
        return await this.inquiryReplyRepository.find({ where: { inquiry_id } });
    }
    async updateStatus(status, id) {
        try {
            return await this.inquiryRepository.update({ id }, { status });
        }
        catch (e) {
            if (e instanceof typeorm_1.QueryFailedError)
                throw new common_1.NotFoundException('해당 문의를 찾을 수 없습니다.');
            throw e;
        }
    }
    async softDeleteInquiry(id) {
        const inquiry = await this.getInquiryById(id);
        if (!inquiry)
            throw new common_1.NotFoundException('해당 문의를 찾을 수 없습니다.');
        if (this.req.user['role'] === 'Admin' || this.req.user['id'] === inquiry.user_id)
            return await this.inquiryRepository.softDelete(id);
        throw new common_1.ForbiddenException('권한이 없습니다.');
    }
};
exports.InquiryService = InquiryService;
exports.InquiryService = InquiryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(inquiry_entity_1.Inquiry)),
    __param(1, (0, typeorm_2.InjectRepository)(inquiry_reply_entity_1.InquiryReply)),
    __param(2, (0, typeorm_2.InjectRepository)(product_entity_1.Product)),
    __param(3, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository, Object])
], InquiryService);
//# sourceMappingURL=inquiry.service.js.map