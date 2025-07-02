"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateArticleEntryDetailsDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_article_entry_details_dto_1 = require("./create-article-entry-details.dto");
class UpdateArticleEntryDetailsDto extends mapped_types_1.PartialType(create_article_entry_details_dto_1.CreateArticleEntryDetailsDto) {
}
exports.UpdateArticleEntryDetailsDto = UpdateArticleEntryDetailsDto;
//# sourceMappingURL=update-article-entry-details.dto.js.map