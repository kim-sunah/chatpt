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
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const create_user_dto_1 = require("./dtos/create-user.dto");
const swagger_1 = require("@nestjs/swagger");
const sign_in_dto_1 = require("./dtos/sign-in.dto");
const kakao_user_dto_1 = require("./dtos/kakao-user.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signUp(createuserDto) {
        const user = await this.authService.signUp(createuserDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: '회원가입에 성공했습니다.',
            user,
        };
    }
    async signIn(signInDto) {
        const { accessToken, refreshToken, authority, limit } = await this.authService.signIn(signInDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: '로그인에 성공했습니다.',
            accessToken,
            refreshToken,
            authority,
            limit
        };
    }
    async Emailauthentication(email) {
        let randomFraction = Math.random();
        let randomNumber = Math.floor(randomFraction * 1000000);
        let sixDigitNumber = randomNumber.toString().padStart(6, '0');
        return this.authService.Emailauthentication(email, sixDigitNumber);
    }
    async naverlogin(code) {
        const client_id = process.env.client_id;
        const client_secret = process.env.client_secret;
        try {
            const response = await fetch(`https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&code=${code}&state=9kgsGTfH4j7IyAkg `, {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const resData = await response.json();
            const responseData = await fetch(`https://openapi.naver.com/v1/nid/me`, {
                method: "GET",
                headers: { "Authorization": "Bearer " + resData.access_token }
            });
            if (!responseData.ok) {
                throw new Error(`HTTP error! Status: ${responseData.status}`);
            }
            const userData = await responseData.json();
            const naveruser = await this.authService.naverlogin(userData.response.email, userData.response.gender, userData.response.mobile, userData.response.name);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: '로그인에 성공했습니다.',
                naveruser
            };
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }
    async naversignin(email) {
        const { accessToken, refreshToken, authority, limit } = await this.authService.naversignin(email);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: '로그인에 성공했습니다.',
            accessToken,
            refreshToken,
            authority,
            limit
        };
    }
    async postKakaoInfo(kakaoLoginDto) {
        console.log(kakaoLoginDto);
        const kakao = await this.authService.kakosignUp(kakaoLoginDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: '로그인에 성공했습니다.',
            kakao,
        };
    }
    async getKakaoInfo(kakaoLoginDto) {
        console.log(kakaoLoginDto);
        const { accessToken, refreshToken, authority, limit } = await this.authService.kakaosignIn(kakaoLoginDto.Email);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: '로그인에 성공했습니다.',
            accessToken,
            refreshToken,
            authority,
            limit
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('/signup'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateuserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('/sign-in'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)("/Email_authentication"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)("Email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "Emailauthentication", null);
__decorate([
    (0, common_1.Post)("naver"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)("code")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "naverlogin", null);
__decorate([
    (0, common_1.Post)("naversignin"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "naversignin", null);
__decorate([
    (0, common_1.Post)('kakaosingup'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kakao_user_dto_1.KakaoLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "postKakaoInfo", null);
__decorate([
    (0, common_1.Post)('kakaosingin'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kakao_user_dto_1.KakaoLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getKakaoInfo", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('인증'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map