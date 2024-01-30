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
exports.CreateuserDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const match_decorator_1 = require("../decorators/match.decorator");
class CreateuserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { Email: { required: true, type: () => String }, Password: { required: true, type: () => String }, ConfirmPassword: { required: true, type: () => String }, Gender: { required: true, type: () => String }, phone: { required: true, type: () => String }, Emailauthentication: { required: true, type: () => String } };
    }
}
exports.CreateuserDto = CreateuserDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: "존재하지 않는 이메일" }),
    (0, class_validator_1.IsNotEmpty)({ message: "이메일을 입력해주세요" }),
    __metadata("design:type", String)
], CreateuserDto.prototype, "Email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: "패스워드를 입력해주세요" }),
    __metadata("design:type", String)
], CreateuserDto.prototype, "Password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, match_decorator_1.IsEqualTo)("Password"),
    __metadata("design:type", String)
], CreateuserDto.prototype, "ConfirmPassword", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateuserDto.prototype, "Gender", void 0);
__decorate([
    (0, class_validator_1.IsMobilePhone)(),
    (0, class_validator_1.IsNotEmpty)({ message: "폰번호를 입력해주세요" }),
    __metadata("design:type", String)
], CreateuserDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: "인증번호를 입력해주세요" }),
    __metadata("design:type", String)
], CreateuserDto.prototype, "Emailauthentication", void 0);
//# sourceMappingURL=create-user.dto.js.map