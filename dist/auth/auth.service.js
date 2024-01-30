"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const mailer_1 = require("@nestjs-modules/mailer");
const cache_manager_1 = require("@nestjs/cache-manager");
let AuthService = class AuthService {
    constructor(userRepository, jwtService, mailerService, cacheManager) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
        this.cacheManager = cacheManager;
    }
    async signUp({ Email, Password, Gender, phone, Emailauthentication }) {
        const email_Emailauthentication = await this.cacheManager.get(Email);
        try {
            const existedUser = await this.userRepository.findOne({ where: { email: Email, registration_information: "site" } });
            if (existedUser) {
                throw new common_1.BadRequestException({ message: "이미 사용중인 이메일입니다" });
            }
            if (email_Emailauthentication !== Emailauthentication) {
                throw new common_1.BadRequestException({ message: "인증번호가 일치하지 않습니다" });
            }
            const Nickname = Email.split("@")[0];
            const hashedPassword = await bcrypt.hashSync(Password, 12);
            const user = this.userRepository.create({ registration_information: "site", email: Email, password: hashedPassword, nickname: Nickname, phone, gender: Gender });
            return await this.userRepository.save(user);
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('회원 가입 중 오류가 발생했습니다.');
        }
    }
    async signIn({ Email, Password }) {
        const user = await this.userRepository.findOne({ where: { email: Email, registration_information: "site" } });
        if (!user) {
            throw new common_1.UnauthorizedException("존재하지 않는 이메일입니다.");
        }
        if (!(await bcrypt.compare(Password, user.password))) {
            throw new common_1.UnauthorizedException("존재하지 않는 비밀번호입니다.");
        }
        const authority = user.authority;
        const accessToken = await this.createAccessToken(+user.id);
        const refreshToken = await this.createRefreshToken();
        return { accessToken, refreshToken, authority };
    }
    async Emailauthentication(email, sixDigitNumber) {
        this.mailerService
            .sendMail({
            to: email,
            from: 'chlxodud04@naver.com',
            subject: '이메일 인증번호',
            html: `<b>${sixDigitNumber}</b>`,
        })
            .then((result) => {
            console.log(result);
        })
            .catch((error) => {
            new common_1.ConflictException(error);
        });
        console.log(email);
        await this.cacheManager.set(email, sixDigitNumber, 30000);
        return { sucess: "이메일 인증" };
    }
    async kakosignUp({ Email, Nickname }) {
        try {
            const existedUser = await this.userRepository.findOne({ where: { email: Email, registration_information: "Kakao" } });
            if (existedUser) {
                return;
            }
            else {
                const user = this.userRepository.create({ registration_information: "Kakao", email: Email, nickname: Nickname, });
                return await this.userRepository.save(user);
            }
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('회원 가입 중 오류가 발생했습니다.');
        }
    }
    async kakaosignIn(Email) {
        console.log("asdasdas");
        const user = await this.userRepository.findOne({ where: { email: Email, registration_information: "Kakao" } });
        if (!user) {
            throw new common_1.UnauthorizedException("존재하지 않는 이메일입니다.");
        }
        const authority = user.authority;
        const accessToken = await this.createAccessToken(+user.id);
        const refreshToken = await this.createRefreshToken();
        return { accessToken, refreshToken, authority };
    }
    async createAccessToken(id) {
        const payload = { id: id };
        return await this.jwtService.signAsync(payload, { expiresIn: '5m' });
    }
    async createRefreshToken() {
        return await this.jwtService.signAsync({}, { expiresIn: '7d' });
    }
    async verifyAccessToken(accessToken) {
        try {
            const payload = await this.jwtService.verify(accessToken);
            return { success: true, id: payload.id };
        }
        catch (error) {
            const payload = await this.jwtService.verify(accessToken, {
                ignoreExpiration: true,
            });
            return { success: false, message: error.message, id: payload.id };
        }
    }
    async verifyRefreshToken(refreshToken) {
        try {
            const payload = await this.jwtService.verify(refreshToken);
            return { success: true };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
    async naverlogin(email, gender, phone, name) {
        const user = await this.userRepository.findOne({ where: { email: email, registration_information: "naver" } });
        if (user) {
            return { email: user.email };
        }
        else {
            const naveruser = this.userRepository.create({ registration_information: "naver", email, nickname: name, phone, gender });
            return await this.userRepository.save(naveruser);
        }
    }
    async naversignin(email) {
        const user = await this.userRepository.findOne({ where: { email: email, registration_information: "naver" } });
        if (!user) {
            throw new common_1.UnauthorizedException("존재하지 않는 이메일입니다.");
        }
        const authority = user.authority;
        const accessToken = await this.createAccessToken(+user.id);
        const refreshToken = await this.createRefreshToken();
        return { accessToken, refreshToken, authority };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        mailer_1.MailerService, Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map