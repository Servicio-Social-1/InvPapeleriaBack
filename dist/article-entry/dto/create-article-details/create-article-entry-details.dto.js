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
exports.CreateArticleEntryDetailsWithIdEntryDto = exports.CreateArticleEntryDetailsDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateArticleEntryDetailsDto {
}
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    class_transformer_1.Type(() => Number),
    __metadata("design:type", Number)
], CreateArticleEntryDetailsDto.prototype, "idArticle", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    class_transformer_1.Type(() => Number),
    __metadata("design:type", Number)
], CreateArticleEntryDetailsDto.prototype, "amount", void 0);
exports.CreateArticleEntryDetailsDto = CreateArticleEntryDetailsDto;
class CreateArticleEntryDetailsWithIdEntryDto extends CreateArticleEntryDetailsDto {
}
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], CreateArticleEntryDetailsWithIdEntryDto.prototype, "idEntry", void 0);
exports.CreateArticleEntryDetailsWithIdEntryDto = CreateArticleEntryDetailsWithIdEntryDto;
//# sourceMappingURL=create-article-entry-details.dto.js.map