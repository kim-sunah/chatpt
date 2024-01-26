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
exports.InquiryController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const inquiry_service_1 = require("./inquiry.service");
const role_guard_1 = require("../auth/guard/role.guard");
const Role_1 = require("../enum/Role");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const inquiry_dto_1 = require("./dtos/inquiry.dto");
const id_1 = require("../util/id");
let InquiryController = class InquiryController {
    constructor(inquiryService) {
        this.inquiryService = inquiryService;
    }
    async getInquiries() {
        return await this.inquiryService.getInquiries();
    }
    async getGeneralInquiry() {
        return await this.inquiryService.getInquiryByProductId(0);
    }
    async getInquiryByProductId(param) {
        return await this.inquiryService.getInquiryByProductId(param.id);
    }
    async getInquiryById(query) {
        return await this.inquiryService.getInquiryById(query.id);
    }
    async createGeneralInquiry(body) {
        return await this.inquiryService.createInquiry(body.body);
    }
    async createInquiry(body, param) {
        return await this.inquiryService.createInquiry(body.body, param.id);
    }
    async getMyInquiries() {
        return await this.inquiryService.getMyInquiries();
    }
    async replyInquiry(body, param) {
        return await this.inquiryService.replyInquiry(body.body, param.id);
    }
    async getReplyByInquiryId(param) {
        return await this.inquiryService.getReplyByInquiryId(param.id);
    }
    async updateStatus(body, param) {
        const { status } = body;
        if ([0, 1, 2].indexOf(status) === -1)
            throw new common_1.BadRequestException('잘못된 요청입니다.');
        return await this.inquiryService.updateStatus(status, param.id);
    }
    async softDeleteInquiry(param) {
        return await this.inquiryService.softDeleteInquiry(param.id);
    }
};
exports.InquiryController = InquiryController;
__decorate([
    (0, common_1.Get)('all'),
    openapi.ApiResponse({ status: 200, type: [require("../entities/inquiry.entity").Inquiry] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InquiryController.prototype, "getInquiries", null);
__decorate([
    (0, common_1.Get)('general'),
    openapi.ApiResponse({ status: 200, type: [require("../entities/inquiry.entity").Inquiry] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InquiryController.prototype, "getGeneralInquiry", null);
__decorate([
    (0, common_1.Get)('product/:id'),
    openapi.ApiResponse({ status: 200, type: [require("../entities/inquiry.entity").Inquiry] }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_1.Id]),
    __metadata("design:returntype", Promise)
], InquiryController.prototype, "getInquiryByProductId", null);
__decorate([
    (0, common_1.Get)(''),
    openapi.ApiResponse({ status: 200, type: require("../entities/inquiry.entity").Inquiry }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_1.Id]),
    __metadata("design:returntype", Promise)
], InquiryController.prototype, "getInquiryById", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(Role_1.Role.Seller, Role_1.Role.User),
    (0, common_1.Post)(''),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inquiry_dto_1.InquiryDto]),
    __metadata("design:returntype", Promise)
], InquiryController.prototype, "createGeneralInquiry", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(Role_1.Role.Seller, Role_1.Role.User),
    (0, common_1.Post)('product/:id'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inquiry_dto_1.InquiryDto, id_1.Id]),
    __metadata("design:returntype", Promise)
], InquiryController.prototype, "createInquiry", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(Role_1.Role.Seller, Role_1.Role.User),
    (0, common_1.Get)('my'),
    openapi.ApiResponse({ status: 200, type: [require("../entities/inquiry.entity").Inquiry] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InquiryController.prototype, "getMyInquiries", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, common_1.Post)(':id'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inquiry_dto_1.InquiryDto, id_1.Id]),
    __metadata("design:returntype", Promise)
], InquiryController.prototype, "replyInquiry", null);
__decorate([
    (0, common_1.Get)(':id/replies'),
    openapi.ApiResponse({ status: 200, type: [require("../entities/inquiry-reply.entity").InquiryReply] }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_1.Id]),
    __metadata("design:returntype", Promise)
], InquiryController.prototype, "getReplyByInquiryId", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(Role_1.Role.Admin),
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, id_1.Id]),
    __metadata("design:returntype", Promise)
], InquiryController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_1.Id]),
    __metadata("design:returntype", Promise)
], InquiryController.prototype, "softDeleteInquiry", null);
exports.InquiryController = InquiryController = __decorate([
    (0, common_1.Controller)('inquiry'),
    __metadata("design:paramtypes", [inquiry_service_1.InquiryService])
], InquiryController);
//# sourceMappingURL=inquiry.controller.js.map