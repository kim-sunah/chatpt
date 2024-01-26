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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("../entities/product.entity");
let AdminService = class AdminService {
    constructor(userRepository, productRepositoy) {
        this.userRepository = userRepository;
        this.productRepositoy = productRepositoy;
    }
    async Allusercount(page) {
        const product = await this.productRepositoy.find();
        const productCount = product.length;
        const user = await this.userRepository.find();
        const userCount = user.length;
        const products = await this.productRepositoy.find({ skip: (page - 1) * 6, take: 6 });
        const users = await this.userRepository.find({ skip: (page - 1) * 6, take: 6 });
        return { users, products, productCount, userCount };
    }
    async count(page) {
        const users = await this.userRepository.find();
        const products = await this.productRepositoy.find();
        const userCount = users.length;
        const productCount = products.length;
        return { userCount, productCount };
    }
    async RecentlyAlluser() {
        const users = await this.userRepository.find({ order: { createdAt: 'DESC', }, take: 8 });
        return { users };
    }
    async productlist(page) {
        const product = await this.productRepositoy.find();
        const productCount = product.length;
        const products = await this.productRepositoy.find({ skip: (page - 1) * 5, take: 5 });
        return { products, productCount, };
    }
    async userList(page) {
        const user = await this.userRepository.find();
        const userCount = user.length;
        const users = await this.userRepository.find({ skip: (page - 1) * 11, take: 11 });
        return { users, userCount };
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
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository, typeorm_2.Repository])
], AdminService);
//# sourceMappingURL=admin.service.js.map