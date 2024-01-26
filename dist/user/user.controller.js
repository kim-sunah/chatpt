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
exports.UserController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const userinfo_decorator_1 = require("../auth/decorators/userinfo.decorator");
const user_entity_1 = require("../entities/user.entity");
const update_user_dto_1 = require("./dto/update-user.dto");
const jwt_auth_guards_1 = require("../auth/guard/jwt-auth.guards");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUserInfo(userinfo) {
        const user = await this.userService.getUserInfo(userinfo.id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: '회원 정보를 성공적으로 가져왔습니다.',
            user,
        };
    }
    async updateUserinfo(userinfo, updateUser) {
        const user = await this.userService.updateUserinfo(userinfo.id, updateUser);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: '회원 정보를 성공적으로 업데이트했습니다.',
        };
    }
    async limituser(id) {
        await this.userService.limituser(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: '회원 정보를 성공적으로 업데이트했습니다.',
        };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('/Mypage'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, userinfo_decorator_1.UserInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserInfo", null);
__decorate([
    (0, common_1.Put)('/MypageUpdate'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, userinfo_decorator_1.UserInfo)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, update_user_dto_1.UpdateuserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserinfo", null);
__decorate([
    (0, common_1.Put)('/limituser'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "limituser", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('회원'),
    (0, common_1.UseGuards)(jwt_auth_guards_1.JwtAuthGuard),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map