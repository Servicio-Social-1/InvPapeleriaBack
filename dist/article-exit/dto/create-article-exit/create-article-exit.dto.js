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
exports.CreateArticleExitDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_article_exit_details_dto_1 = require("../create-article-exit-details/create-article-exit-details.dto");
class CreateArticleExitDto {
}
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], CreateArticleExitDto.prototype, "idPetitioner", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], CreateArticleExitDto.prototype, "idArea", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], CreateArticleExitDto.prototype, "idUser", void 0);
__decorate([
    class_validator_1.IsArray(),
    class_validator_1.ArrayNotEmpty(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => create_article_exit_details_dto_1.CreateArticleExitDetailsDto),
    __metadata("design:type", Array)
], CreateArticleExitDto.prototype, "articleExitDetails", void 0);
exports.CreateArticleExitDto = CreateArticleExitDto;
//# sourceMappingURL=create-article-exit.dto.js.map