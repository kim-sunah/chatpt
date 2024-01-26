"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwUpdateDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const update_comment_dto_1 = require("./update-comment.dto");
class SwUpdateDto extends (0, swagger_1.PickType)(update_comment_dto_1.UpdateCommentDto, ['comment']) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.SwUpdateDto = SwUpdateDto;
//# sourceMappingURL=swupdate-comment.dto.js.map