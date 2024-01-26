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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("../entities/product.entity");
let UserService = class UserService {
    constructor(userRepository, productRepositoy) {
        this.userRepository = userRepository;
        this.productRepositoy = productRepositoy;
    }
    async getUserInfo(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new common_1.NotFoundException('사용자를 찾을 수 없습니다.');
        }
        return user;
    }
    async updateUserinfo(id, updateUser) {
        const user = await this.userRepository.findOne({ where: { id: id } });
        if (user.email !== updateUser.Email) {
            const existemail = await this.userRepository.findOne({ where: { email: updateUser.Email } });
            if (existemail) {
                throw new common_1.BadRequestException("이미 사용중인 이메일입니다.");
            }
        }
        if (user.nickname !== updateUser.Nickname) {
            const existname = await this.userRepository.findOne({ where: { nickname: updateUser.Nickname } });
            if (existname) {
                throw new common_1.BadRequestException("이미 사용중인 이름입니다");
            }
        }
        if (user.phone !== updateUser.phone) {
            const existphone = await this.userRepository.findOne({ where: { phone: updateUser.phone } });
            if (existphone) {
                throw new common_1.BadRequestException("이미 사용중인 번호입니다.");
            }
        }
        if (user) {
            await this.userRepository.update(id, { email: updateUser.Email, nickname: updateUser.Nickname, phone: updateUser.phone });
        }
        else {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
    }
    async limituser(id) {
        const user = await this.userRepository.findOne({ where: { id: id } });
        if (!user) {
            throw new common_1.NotFoundException("존재하지 않는 유저입니다");
        }
        if (user.limit === false) {
            user.limit = true;
        }
        else if (user.limit === true) {
            user.limit = false;
        }
        return await this.userRepository.update(id, user);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map