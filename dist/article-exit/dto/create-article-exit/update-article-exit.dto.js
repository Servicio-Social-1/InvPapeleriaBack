"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateArticleExitDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_article_exit_dto_1 = require("./create-article-exit.dto");
class UpdateArticleExitDto extends mapped_types_1.PartialType(create_article_exit_dto_1.CreateArticleExitDto) {
}
exports.UpdateArticleExitDto = UpdateArticleExitDto;
//# sourceMappingURL=update-article-exit.dto.js.map