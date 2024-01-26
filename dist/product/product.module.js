"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const product_controller_1 = require("./product.controller");
const product_service_1 = require("./product.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const product_entity_1 = require("../entities/product.entity");
const product_image_entity_1 = require("../entities/product-image.entity");
const storage_entity_1 = require("../entities/storage.entity");
const comment_entity_1 = require("../entities/comment.entity");
const platform_express_1 = require("@nestjs/platform-express");
const config_1 = require("@nestjs/config");
const client_s3_1 = require("@aws-sdk/client-s3");
const multer_s3_1 = __importDefault(require("multer-s3"));
const path_1 = require("path");
const auth_module_1 = require("../auth/auth.module");
const multerOptionsFactory = (configService) => {
    return {
        storage: (0, multer_s3_1.default)({
            s3: new client_s3_1.S3Client({
                region: configService.get('S3_REGION'),
                credentials: {
                    accessKeyId: configService.get('S3_ACCESS_ID'),
                    secretAccessKey: configService.get('S3_SECRET_KEY')
                }
            }),
            bucket: configService.get('S3_BUCKET'),
            contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
            metadata(req, file, callback) {
                callback(null, { owner: 'it' });
            },
            key(req, file, callback) {
                const ext = (0, path_1.extname)(file.originalname);
                const baseName = (0, path_1.basename)(file.originalname, ext);
                const fileName = `images/${baseName}-${Date.now()}${ext}`;
                callback(null, fileName);
            }
        }),
        limits: {
            fileSize: 2 * 1024 * 1024
        },
        fileFilter: (req, file, callback) => {
            const allowedFileTypes = ['.jpg', '.jpeg', '.png'];
            const ext = (0, path_1.extname)(file.originalname).toLowerCase();
            if (allowedFileTypes.includes(ext)) {
                callback(null, true);
            }
            else {
                callback(new Error('Only JPG and PNG files are allowed'), false);
            }
        }
    };
};
let ProductModule = class ProductModule {
};
exports.ProductModule = ProductModule;
exports.ProductModule = ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product, product_image_entity_1.ProductImage, storage_entity_1.Storage, comment_entity_1.Comment, user_entity_1.User]),
            platform_express_1.MulterModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: multerOptionsFactory,
                inject: [config_1.ConfigService]
            }),
            auth_module_1.AuthModule
        ],
        controllers: [product_controller_1.ProductController],
        providers: [product_service_1.ProductService]
    })
], ProductModule);
//# sourceMappingURL=product.module.js.map