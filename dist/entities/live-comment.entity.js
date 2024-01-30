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
exports.LiveComment = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let LiveComment = class LiveComment {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, live_id: { required: true, type: () => Number }, user_id: { required: true, type: () => Number }, body: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, deletedAt: { required: true, type: () => Date, nullable: true } };
    }
};
exports.LiveComment = LiveComment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ unsigned: true }),
    __metadata("design:type", Number)
], LiveComment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { unsigned: true }),
    __metadata("design:type", Number)
], LiveComment.prototype, "live_id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { unsigned: true }),
    __metadata("design:type", Number)
], LiveComment.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LiveComment.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], LiveComment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], LiveComment.prototype, "deletedAt", void 0);
exports.LiveComment = LiveComment = __decorate([
    (0, typeorm_1.Entity)('live_comment')
], LiveComment);
//# sourceMappingURL=live-comment.entity.js.map