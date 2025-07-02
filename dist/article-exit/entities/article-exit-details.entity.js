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
exports.ArticleExitDetail = void 0;
const typeorm_1 = require("typeorm");
const article_entity_1 = require("../../articles/entities/article.entity");
const article_exit_entity_1 = require("./article-exit.entity");
let ArticleExitDetail = class ArticleExitDetail {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ArticleExitDetail.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'numeric',
    }),
    __metadata("design:type", Number)
], ArticleExitDetail.prototype, "amount", void 0);
__decorate([
    typeorm_1.ManyToOne(() => article_entity_1.Article, (article) => article.articleExitDetail, {
        eager: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", article_entity_1.Article)
], ArticleExitDetail.prototype, "article", void 0);
__decorate([
    typeorm_1.ManyToOne(() => article_exit_entity_1.ArticleExit, (articleExit) => articleExit.articleExitDetail, { eager: true }),
    __metadata("design:type", article_exit_entity_1.ArticleExit)
], ArticleExitDetail.prototype, "articleExit", void 0);
ArticleExitDetail = __decorate([
    typeorm_1.Entity('article_exits_detail')
], ArticleExitDetail);
exports.ArticleExitDetail = ArticleExitDetail;
//# sourceMappingURL=article-exit-details.entity.js.map