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
exports.ProductImage = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
let ProductImage = class ProductImage {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, product_id: { required: true, type: () => Number }, original_url: { required: true, type: () => String }, server_url: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: true, type: () => Date, nullable: true }, product: { required: true, type: () => require("./product.entity").Product } };
    }
};
exports.ProductImage = ProductImage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ unsigned: true }),
    __metadata("design:type", Number)
], ProductImage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { unsigned: true }),
    __metadata("design:type", Number)
], ProductImage.prototype, "product_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductImage.prototype, "original_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProductImage.prototype, "server_url", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ProductImage.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ProductImage.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], ProductImage.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, product => product.images),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.Product)
], ProductImage.prototype, "product", void 0);
exports.ProductImage = ProductImage = __decorate([
    (0, typeorm_1.Entity)('product_image')
], ProductImage);
//# sourceMappingURL=product-image.entity.js.map