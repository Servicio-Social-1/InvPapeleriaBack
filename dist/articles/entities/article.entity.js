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
exports.Article = void 0;
const article_entry_details_1 = require("../../article-entry/entities/article-entry-details");
const article_exit_details_entity_1 = require("../../article-exit/entities/article-exit-details.entity");
const typeorm_1 = require("typeorm");
let Article = class Article {
    checkSlugInsert() {
        this.description = this.description.trim();
        this.size = this.size.trim();
    }
    checkSlugUpdate() {
        this.description = this.description.trim();
        this.size = this.size.trim();
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Article.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 100,
        unique: true,
    }),
    __metadata("design:type", String)
], Article.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0,
    }),
    __metadata("design:type", Number)
], Article.prototype, "stock", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 100,
    }),
    __metadata("design:type", String)
], Article.prototype, "size", void 0);
__decorate([
    typeorm_1.Column({
        type: 'bool',
        default: true,
    }),
    __metadata("design:type", Boolean)
], Article.prototype, "status", void 0);
__decorate([
    typeorm_1.OneToMany(() => article_entry_details_1.ArticleEntryDetail, (articleEntryDetail) => articleEntryDetail.article, { cascade: true }),
    __metadata("design:type", Array)
], Article.prototype, "articleEntryDetail", void 0);
__decorate([
    typeorm_1.OneToMany(() => article_exit_details_entity_1.ArticleExitDetail, (articleExitDetail) => articleExitDetail.article, { cascade: true }),
    __metadata("design:type", Array)
], Article.prototype, "articleExitDetail", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Article.prototype, "checkSlugInsert", null);
__decorate([
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Article.prototype, "checkSlugUpdate", null);
Article = __decorate([
    typeorm_1.Entity('articles'),
    typeorm_1.Check('"stock" >= 0')
], Article);
exports.Article = Article;
//# sourceMappingURL=article.entity.js.map