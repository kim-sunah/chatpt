"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivecastModule = void 0;
const common_1 = require("@nestjs/common");
const livecast_controller_1 = require("./livecast.controller");
const livecast_service_1 = require("./livecast.service");
const typeorm_1 = require("@nestjs/typeorm");
const livecast_entity_1 = require("../entities/livecast.entity");
const live_comment_entity_1 = require("../entities/live-comment.entity");
let LivecastModule = class LivecastModule {
};
exports.LivecastModule = LivecastModule;
exports.LivecastModule = LivecastModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([livecast_entity_1.Livecast, live_comment_entity_1.LiveComment])],
        controllers: [livecast_controller_1.LivecastController],
        providers: [livecast_service_1.LivecastService]
    })
], LivecastModule);
//# sourceMappingURL=livecast.module.js.map