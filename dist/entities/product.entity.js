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
exports.Product = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const Category_1 = require("../enum/Category");
const ProductStatus_1 = require("../enum/ProductStatus");
const user_entity_1 = require("./user.entity");
const product_image_entity_1 = require("./product-image.entity");
const inquiry_entity_1 = require("./inquiry.entity");
const comment_entity_1 = require("./comment.entity");
let Product = class Product {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, user_id: { required: true, type: () => Number }, name: { required: true, type: () => String }, thumbnail: { required: true, type: () => String }, category: { required: true, enum: require("../enum/Category").Category }, status: { required: true, enum: require("../enum/ProductStatus").ProductStatus }, body: { required: true, type: () => String }, price: { required: true, type: () => Number }, sale_price: { required: true, type: () => Number }, rating_count: { required: true, type: () => Number }, rating_total: { required: true, type: () => Number }, sales_volume: { required: true, type: () => Number }, revenue: { required: true, type: () => Number }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: true, type: () => Date, nullable: true }, user: { required: true, type: () => require("./user.entity").User }, images: { required: true, type: () => [require("./product-image.entity").ProductImage] }, inquiries: { required: true, type: () => [require("./inquiry.entity").Inquiry] }, comment: { required: true, type: () => [require("./comment.entity").Comment] } };
    }
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ unsigned: true }),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { unsigned: true }),
    __metadata("design:type", Number)
], Product.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "thumbnail", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: Category_1.Category, default: Category_1.Category.Others }),
    __metadata("design:type", Number)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: ProductStatus_1.ProductStatus, default: ProductStatus_1.ProductStatus.Salable }),
    __metadata("design:type", Number)
], Product.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { unsigned: true }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { unsigned: true }),
    __metadata("design:type", Number)
], Product.prototype, "sale_price", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { unsigned: true, default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "rating_count", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { unsigned: true, default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "rating_total", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { unsigned: true, default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "sales_volume", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint', { unsigned: true, default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "revenue", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Product.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.products),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Product.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_image_entity_1.ProductImage, (productImage) => productImage.product),
    __metadata("design:type", Array)
], Product.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => inquiry_entity_1.Inquiry, (inquiry) => inquiry.product),
    __metadata("design:type", Array)
], Product.prototype, "inquiries", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.product),
    __metadata("design:type", Array)
], Product.prototype, "comment", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)('product'),
    (0, typeorm_1.Index)(['name', 'body'], { fulltext: true, parser: 'ngram' })
], Product);
//# sourceMappingURL=product.entity.js.map