"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwCreateDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_comment_dto_1 = require("./create-comment.dto");
class SwCreateDto extends (0, swagger_1.PickType)(create_comment_dto_1.CreateCommentDto, ["comment"]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.SwCreateDto = SwCreateDto;
//# sourceMappingURL=swcreate-comment.dto.js.map