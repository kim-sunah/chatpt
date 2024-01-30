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
exports.RoleGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guards_1 = require("./jwt-auth.guards");
const user_entity_1 = require("../../entities/user.entity");
const auth_service_1 = require("../auth.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
let RoleGuard = class RoleGuard extends jwt_auth_guards_1.JwtAuthGuard {
    constructor(authService, reflector, userRepository) {
        super(authService);
        this.reflector = reflector;
        this.userRepository = userRepository;
    }
    async canActivate(context) {
        const authenticated = await super.canActivate(context);
        if (!authenticated)
            return false;
        const req = context.switchToHttp().getRequest();
        const { id } = req.user;
        const user = await this.userRepository.findOne({ where: { id } });
        const roles = this.reflector.get('roles', context.getHandler());
        req.user.role = user.authority;
        if (!roles)
            return true;
        return roles.some((role) => user.authority === role);
    }
};
exports.RoleGuard = RoleGuard;
exports.RoleGuard = RoleGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        core_1.Reflector,
        typeorm_1.Repository])
], RoleGuard);
//# sourceMappingURL=role.guard.js.map