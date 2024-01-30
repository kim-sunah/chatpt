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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const product_entity_1 = require("../entities/product.entity");
const product_image_entity_1 = require("../entities/product-image.entity");
const core_1 = require("@nestjs/core");
let ProductService = class ProductService {
    constructor(productRepository, productImageRepository, req) {
        this.productRepository = productRepository;
        this.productImageRepository = productImageRepository;
        this.req = req;
    }
    async getProducts(page, pageSize) {
        return await this.productRepository.find({ take: pageSize, skip: (page - 1) * pageSize });
    }
    query(key, antiKey) {
        const keyQuery = key.split(' ').map(k => '+' + k).join(' ');
        const antiKeyQuery = antiKey ? antiKey.split(' ').map(k => '-' + k).join(' ') : '';
        return keyQuery + (antiKeyQuery ? ' ' + antiKeyQuery : '');
    }
    categoryArray(categories) {
        const arr = [];
        for (let i = 0, j = 1; i < 10; ++i, j *= 2)
            if (categories & j)
                arr.push(i);
        return arr;
    }
    async searchProducts(query) {
        const { page, pageSize, key, antiKey, minSalePrice, maxSalePrice, categories } = query;
        return await this.productRepository
            .createQueryBuilder().select()
            .where(`match(name, body) against ('${this.query(key, antiKey)}' in boolean mode)`)
            .andWhere(`sale_price between ${minSalePrice} and ${maxSalePrice}`)
            .andWhere(`category in (${this.categoryArray(categories).map(c => `'${c}'`).join(',')})`)
            .take(pageSize).skip((page - 1) * pageSize)
            .getManyAndCount();
    }
    async getProductById(id) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product)
            throw new common_1.NotFoundException('해당 상품을 찾을 수 없습니다.');
        return product;
    }
    async checkUploader(id) {
        const product = await this.getProductById(id);
        if (product.user_id !== this.req.user['id'])
            throw new common_1.ForbiddenException('권한이 없습니다.');
        return product;
    }
    async createProduct(body) {
        body.sale_price = body.sale_price || body.price;
        return await this.productRepository.save({ ...body, user_id: this.req.user['id'] });
    }
    async softDeleteProduct(id) {
        await this.checkUploader(id);
        await this.productRepository.softDelete(id);
    }
    async updateProduct(id, body) {
        await this.checkUploader(id);
        return await this.productRepository.save({ id, ...body });
    }
    async getMyProducts(query) {
        const { page, pageSize } = query;
        return await this.productRepository.findAndCount({ where: { user_id: this.req.user['id'] }, take: pageSize, skip: (page - 1) * pageSize });
    }
    async uploadThumbnail(id, thumbnail) {
        await this.checkUploader(id);
        return await this.productRepository.save({ id, thumbnail });
    }
    async uploadImage(product_id, original_url) {
        await this.checkUploader(product_id);
        return await this.productImageRepository.save({ product_id, original_url });
    }
    async getImages(product_id) {
        return await this.productImageRepository.find({ where: { product_id } });
    }
    async softDeleteImage(id) {
        const image = await this.productImageRepository.findOne({ where: { id } });
        if (!image)
            throw new common_1.NotFoundException('해당 이미지를 찾을 수 없습니다.');
        await this.checkUploader(image.product_id);
        return await this.productImageRepository.softDelete(id);
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, typeorm_2.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_2.InjectRepository)(product_image_entity_1.ProductImage)),
    __param(2, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository, Object])
], ProductService);
//# sourceMappingURL=product.service.js.map