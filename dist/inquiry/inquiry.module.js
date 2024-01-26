"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InquiryModule = void 0;
const common_1 = require("@nestjs/common");
const inquiry_controller_1 = require("./inquiry.controller");
const inquiry_service_1 = require("./inquiry.service");
const typeorm_1 = require("@nestjs/typeorm");
const inquiry_entity_1 = require("../entities/inquiry.entity");
const inquiry_reply_entity_1 = require("../entities/inquiry-reply.entity");
const auth_module_1 = require("../auth/auth.module");
const user_entity_1 = require("../entities/user.entity");
const product_entity_1 = require("../entities/product.entity");
let InquiryModule = class InquiryModule {
};
exports.InquiryModule = InquiryModule;
exports.InquiryModule = InquiryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([inquiry_entity_1.Inquiry, inquiry_reply_entity_1.InquiryReply, user_entity_1.User, product_entity_1.Product]), auth_module_1.AuthModule],
        controllers: [inquiry_controller_1.InquiryController],
        providers: [inquiry_service_1.InquiryService]
    })
], InquiryModule);
//# sourceMappingURL=inquiry.module.js.map