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
exports.UpdateuserDto = exports.Gender = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 0] = "Male";
    Gender[Gender["Female"] = 1] = "Female";
})(Gender || (exports.Gender = Gender = {}));
class UpdateuserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { Email: { required: true, type: () => String }, Nickname: { required: true, type: () => String }, Password: { required: true, type: () => String }, Gender: { required: true, enum: require("./update-user.dto").Gender }, phone: { required: true, type: () => String } };
    }
}
exports.UpdateuserDto = UpdateuserDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: "이메일 형식에 맞게 입력해주세요" }),
    (0, class_validator_1.IsNotEmpty)({ message: "이메일을 입력해주세요" }),
    __metadata("design:type", String)
], UpdateuserDto.prototype, "Email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "닉네임을 입력해주세요" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateuserDto.prototype, "Nickname", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: "패스워드를 입력해주세요" }),
    (0, class_validator_1.IsStrongPassword)({}, { message: '비밀번호는 영문 알파벳 대/소문자, 숫자, 특수문자를 포함해야합니다.' }),
    __metadata("design:type", String)
], UpdateuserDto.prototype, "Password", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Gender),
    __metadata("design:type", Number)
], UpdateuserDto.prototype, "Gender", void 0);
__decorate([
    (0, class_validator_1.IsMobilePhone)(),
    (0, class_validator_1.IsNotEmpty)({ message: "폰번호를 입력해주세요" }),
    __metadata("design:type", String)
], UpdateuserDto.prototype, "phone", void 0);
//# sourceMappingURL=update-user.dto.js.map