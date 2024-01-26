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
exports.AdminController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async Allusercount(page) {
        const { users, products, productCount, userCount } = await this.adminService.Allusercount(+page);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: '회원 정보를 성공적으로 업데이트했습니다.',
            productCount,
            users,
            userCount,
            products,
        };
    }
    async count(page) {
        const { userCount, productCount } = await this.adminService.count(+page);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: '회원 정보를 성공적으로 업데이트했습니다.',
            userCount,
            productCount,
        };
    }
    async Recentlyuser() {
        const { users } = await this.adminService.RecentlyAlluser();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: '회원 정보를 성공적으로 업데이트했습니다.',
            users,
        };
    }
    async productlist(page) {
        const { products, productCount } = await this.adminService.productlist(+page);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: '회원 정보를 성공적으로 업데이트했습니다.',
            productCount,
            products,
        };
    }
    async userList(page) {
        const { users, userCount } = await this.adminService.userList(+page);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: '회원 정보를 성공적으로 업데이트했습니다.',
            users,
            userCount,
        };
    }
    async limituser(id) {
        await this.adminService.limituser(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: '회원 정보를 성공적으로 업데이트했습니다.',
        };
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Post)('/userinfo'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)("pages")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "Allusercount", null);
__decorate([
    (0, common_1.Get)('/count'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)("pages")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "count", null);
__decorate([
    (0, common_1.Get)('/Alluser'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "Recentlyuser", null);
__decorate([
    (0, common_1.Post)('/productlist'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)("pages")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "productlist", null);
__decorate([
    (0, common_1.Post)('/userlist'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)("pages")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "userList", null);
__decorate([
    (0, common_1.Put)('/limituser'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "limituser", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map