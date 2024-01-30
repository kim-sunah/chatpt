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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inquiry = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const InquiryStatus_1 = require("../enum/InquiryStatus");
const product_entity_1 = require("./product.entity");
const user_entity_1 = require("./user.entity");
const inquiry_reply_entity_1 = require("./inquiry-reply.entity");
let Inquiry = class Inquiry {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, user_id: { required: true, type: () => Number }, product_id: { required: true, type: () => Number }, seller_id: { required: true, type: () => Number }, body: { required: true, type: () => String }, status: { required: true, enum: require("../enum/InquiryStatus").InquiryStatus }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: true, type: () => Date, nullable: true }, replies: { required: true, type: () => [require("./inquiry-reply.entity").InquiryReply] }, user: { required: true, type: () => require("./user.entity").User }, product: { required: false, type: () => require("./product.entity").Product, nullable: true } };
    }
};
exports.Inquiry = Inquiry;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ unsigned: true }),
    __metadata("design:type", Number)
], Inquiry.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { unsigned: true }),
    __metadata("design:type", Number)
], Inquiry.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: true, unsigned: true }),
    __metadata("design:type", Number)
], Inquiry.prototype, "product_id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: true, unsigned: true }),
    __metadata("design:type", Number)
], Inquiry.prototype, "seller_id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Inquiry.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: InquiryStatus_1.InquiryStatus, default: 0 }),
    __metadata("design:type", Number)
], Inquiry.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Inquiry.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Inquiry.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Inquiry.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => inquiry_reply_entity_1.InquiryReply, inquiryReply => inquiryReply.inquiry),
    __metadata("design:type", Array)
], Inquiry.prototype, "replies", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.inquiries),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Inquiry.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, product => product.inquiries),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.Product)
], Inquiry.prototype, "product", void 0);
exports.Inquiry = Inquiry = __decorate([
    (0, typeorm_1.Entity)('inquiry'),
    (0, typeorm_1.Index)(['product_id', 'status']),
    (0, typeorm_1.Index)(['status', 'createdAt'])
], Inquiry);
//# sourceMappingURL=inquiry.entity.js.map