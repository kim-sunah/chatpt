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
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("../auth.service");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(authService) {
        super('jwt');
        this.authService = authService;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const accessToken = req.headers.authorization.split(' ')[1];
        const refreshToken = req.headers.refreshtoken;
        console.log(accessToken, refreshToken);
        if (!accessToken || !refreshToken) {
            throw new common_1.UnauthorizedException('접근할 수 없습니다.');
        }
        const isVerifiedAccessToken = await this.authService.verifyAccessToken(accessToken);
        const id = isVerifiedAccessToken.id;
        if (isVerifiedAccessToken.message === 'jwt expired') {
            const isVerifiedRefreshToken = await this.authService.verifyRefreshToken(refreshToken);
            if (isVerifiedRefreshToken.message === 'jwt expired') {
                throw new common_1.UnauthorizedException('토큰이 만료되었습니다. 다시 로그인해주세요.');
            }
            const newAccessToken = await this.authService.createAccessToken(id);
            req.user = { id, accessToken: newAccessToken, refreshToken };
            return true;
        }
        req.user = { id, accessToken, refreshToken };
        return true;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guards.js.map