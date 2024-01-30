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
exports.ProductController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const create_product_dto_1 = require("./dtos/create-product.dto");
const update_product_dto_1 = require("./dtos/update-product.dto");
const search_product_dto_1 = require("./dtos/search-product.dto");
const page_dto_1 = require("./dtos/page.dto");
const id_1 = require("../util/id");
const platform_express_1 = require("@nestjs/platform-express");
const role_guard_1 = require("../auth/guard/role.guard");
const Role_1 = require("../enum/Role");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async getProducts(query) {
        const { page, pageSize } = query;
        return await this.productService.getProducts(page, pageSize);
    }
    async searchProducts(query) {
        return await this.productService.searchProducts(query);
    }
    async getMyProducts(query) {
        return await this.productService.getMyProducts(query);
    }
    async getProductById(query) {
        return await this.productService.getProductById(query.id);
    }
    async createProduct(body) {
        return await this.productService.createProduct(body);
    }
    async softDeleteProduct(param) {
        await this.productService.softDeleteProduct(param.id);
    }
    async updateProduct(param, body) {
        return await this.productService.updateProduct(param.id, body);
    }
    async uploadThumbnail(image, param) {
        return await this.productService.uploadThumbnail(param.id, image.location);
    }
    async uploadImage(image, param) {
        return await this.productService.uploadImage(param.id, image.location);
    }
    async getImages(param) {
        return await this.productService.getImages(param.id);
    }
    async softDeleteImage(param) {
        return await this.productService.softDeleteImage(param.id);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Get)('all'),
    openapi.ApiResponse({ status: 200, type: [require("../entities/product.entity").Product] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_dto_1.PageDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Get)('search'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_product_dto_1.SearchProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "searchProducts", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(Role_1.Role.Seller),
    (0, common_1.Get)('my'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_dto_1.PageDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getMyProducts", null);
__decorate([
    (0, common_1.Get)(''),
    openapi.ApiResponse({ status: 200, type: require("../entities/product.entity").Product }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_1.Id]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductById", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(Role_1.Role.Seller),
    (0, common_1.Post)(''),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(Role_1.Role.Seller),
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_1.Id]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "softDeleteProduct", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(Role_1.Role.Seller),
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_1.Id, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(Role_1.Role.Seller),
    (0, common_1.Patch)(':id/thumbnail'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, id_1.Id]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "uploadThumbnail", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(Role_1.Role.Seller),
    (0, common_1.Post)(':id/image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, id_1.Id]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Get)(':id/image'),
    openapi.ApiResponse({ status: 200, type: [require("../entities/product-image.entity").ProductImage] }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_1.Id]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getImages", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(Role_1.Role.Seller),
    (0, common_1.Delete)('image/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_1.Id]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "softDeleteImage", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map