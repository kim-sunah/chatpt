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
exports.AppModule = void 0;
const joi_1 = __importDefault(require("joi"));
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const product_module_1 = require("./product/product.module");
const inquiry_module_1 = require("./inquiry/inquiry.module");
const livecast_module_1 = require("./livecast/livecast.module");
const cache_manager_1 = require("@nestjs/cache-manager");
const comment_module_1 = require("./comment/comment.module");
const admin_module_1 = require("./admin/admin.module");
const typeOrmModuleOptions = {
    useFactory: async (configService) => ({
        namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
        type: "mysql",
        username: configService.get("DB_USERNAME"),
        password: configService.get("DB_PASSWORD"),
        host: configService.get("DB_HOST"),
        port: configService.get("DB_PORT"),
        database: configService.get("DB_NAME"),
        entities: [__dirname + '/entities/*{.js,.ts}'],
        synchronize: configService.get("DB_SYNC"),
        logging: true,
    }),
    inject: [config_1.ConfigService],
};
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: joi_1.default.object({
                    JWT_SECRET_KEY: joi_1.default.string().required(),
                    DB_USERNAME: joi_1.default.string().required(),
                    DB_PASSWORD: joi_1.default.string().required(),
                    DB_HOST: joi_1.default.string().required(),
                    DB_PORT: joi_1.default.number().required(),
                    DB_NAME: joi_1.default.string().required(),
                    DB_SYNC: joi_1.default.boolean().required(),
                }),
            }),
            cache_manager_1.CacheModule.register({
                ttl: 6,
                max: 1000,
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync(typeOrmModuleOptions),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            product_module_1.ProductModule,
            livecast_module_1.LivecastModule,
            inquiry_module_1.InquiryModule,
            comment_module_1.CommentModule,
            admin_module_1.AdminModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map