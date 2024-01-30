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
exports.Refund = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let Refund = class Refund {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, payment_id: { required: true, type: () => Number }, amount: { required: true, type: () => Number }, body: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: true, type: () => Date, nullable: true } };
    }
};
exports.Refund = Refund;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ unsigned: true }),
    __metadata("design:type", Number)
], Refund.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { unsigned: true }),
    __metadata("design:type", Number)
], Refund.prototype, "payment_id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { unsigned: true }),
    __metadata("design:type", Number)
], Refund.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Refund.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Refund.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Refund.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Refund.prototype, "deletedAt", void 0);
exports.Refund = Refund = __decorate([
    (0, typeorm_1.Entity)('refund')
], Refund);
//# sourceMappingURL=refund.entity.js.map