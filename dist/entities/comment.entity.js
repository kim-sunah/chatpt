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
exports.Comment = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let Comment = class Comment {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, product_id: { required: true, type: () => Number }, user_id: { required: true, type: () => Number }, body: { required: true, type: () => String }, rating: { required: true, type: () => Number }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: true, type: () => Date, nullable: true } };
    }
};
exports.Comment = Comment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ unsigned: true }),
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { unsigned: true }),
    __metadata("design:type", Number)
], Comment.prototype, "product_id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { unsigned: true }),
    __metadata("design:type", Number)
], Comment.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Comment.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.Column)('tinyint', { unsigned: true, default: 10 }),
    __metadata("design:type", Number)
], Comment.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Comment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Comment.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Comment.prototype, "deletedAt", void 0);
exports.Comment = Comment = __decorate([
    (0, typeorm_1.Entity)('comment')
], Comment);
//# sourceMappingURL=comment.entity.js.map