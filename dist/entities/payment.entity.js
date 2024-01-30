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
exports.Payment = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const PayStatus_1 = require("../enum/PayStatus");
let Payment = class Payment {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, user_id: { required: true, type: () => Number }, product_id: { required: true, type: () => Number }, pay_method_id: { required: true, type: () => Number }, spending: { required: true, type: () => Number }, count: { required: true, type: () => Number }, mileage: { required: true, type: () => Number }, status: { required: true, enum: require("../enum/PayStatus").PayStatus }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: true, type: () => Date, nullable: true } };
    }
};
exports.Payment = Payment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ unsigned: true }),
    __metadata("design:type", Number)
], Payment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { unsigned: true }),
    __metadata("design:type", Number)
], Payment.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { unsigned: true }),
    __metadata("design:type", Number)
], Payment.prototype, "product_id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { unsigned: true }),
    __metadata("design:type", Number)
], Payment.prototype, "pay_method_id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { unsigned: true }),
    __metadata("design:type", Number)
], Payment.prototype, "spending", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { unsigned: true }),
    __metadata("design:type", Number)
], Payment.prototype, "count", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { unsigned: true }),
    __metadata("design:type", Number)
], Payment.prototype, "mileage", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: PayStatus_1.PayStatus, default: PayStatus_1.PayStatus.Pending }),
    __metadata("design:type", Number)
], Payment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Payment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Payment.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Payment.prototype, "deletedAt", void 0);
exports.Payment = Payment = __decorate([
    (0, typeorm_1.Entity)('payment')
], Payment);
//# sourceMappingURL=payment.entity.js.map