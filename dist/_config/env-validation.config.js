"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.envValidationSchema = joi_1.default.object({
    SERVER_PORT: joi_1.default.number().required(),
    DB_HOST: joi_1.default.string().required(),
    DB_PORT: joi_1.default.number().required(),
    DB_USERNAME: joi_1.default.string().required(),
    DB_PASSWORD: joi_1.default.string().required(),
    DB_NAME: joi_1.default.string().required(),
    DB_SYNC: joi_1.default.boolean().required(),
    JWT_SECRET_KEY: joi_1.default.string().required(),
});
//# sourceMappingURL=env-validation.config.js.map