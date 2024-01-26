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
exports.InquiryReply = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const inquiry_entity_1 = require("./inquiry.entity");
const Role_1 = require("../enum/Role");
let InquiryReply = class InquiryReply {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, user_id: { required: true, type: () => Number }, inquiry_id: { required: true, type: () => Number }, role: { required: true, enum: require("../enum/Role").Role }, body: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: true, type: () => Date, nullable: true }, user: { required: true, type: () => require("./user.entity").User }, inquiry: { required: true, type: () => require("./inquiry.entity").Inquiry } };
    }
};
exports.InquiryReply = InquiryReply;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ unsigned: true }),
    __metadata("design:type", Number)
], InquiryReply.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { unsigned: true }),
    __metadata("design:type", Number)
], InquiryReply.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { unsigned: true }),
    __metadata("design:type", Number)
], InquiryReply.prototype, "inquiry_id", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: Role_1.Role, default: Role_1.Role.User }),
    __metadata("design:type", String)
], InquiryReply.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], InquiryReply.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], InquiryReply.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], InquiryReply.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], InquiryReply.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.inquiryReplies),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], InquiryReply.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => inquiry_entity_1.Inquiry, inquiry => inquiry.replies),
    (0, typeorm_1.JoinColumn)({ name: 'inquiry_id' }),
    __metadata("design:type", inquiry_entity_1.Inquiry)
], InquiryReply.prototype, "inquiry", void 0);
exports.InquiryReply = InquiryReply = __decorate([
    (0, typeorm_1.Entity)('inquiry_reply'),
    (0, typeorm_1.Index)(['inquiry_id', 'createdAt'])
], InquiryReply);
//# sourceMappingURL=inquiry-reply.entity.js.map