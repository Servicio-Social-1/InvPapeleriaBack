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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleEntryDetailsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const article_entry_details_1 = require("../entities/article-entry-details");
const typeorm_2 = require("typeorm");
let ArticleEntryDetailsRepository = class ArticleEntryDetailsRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async create({ article, articleEntry, amount, }) {
        const articleEntryDetail = this.createEntityInstance({
            article,
            articleEntry,
            amount,
        });
        return await this.saveEntityInstance(articleEntryDetail);
    }
    async saveEntityInstance(articleEntryDetail) {
        return await this.repository.save(articleEntryDetail);
    }
    createEntityInstance({ article, articleEntry, amount, }) {
        return this.repository.create({
            article,
            articleEntry,
            amount,
        });
    }
    async deleteAllById(idArticleEntry) {
        return await this.repository
            .createQueryBuilder()
            .delete()
            .from(article_entry_details_1.ArticleEntryDetail)
            .where('articleEntryId = :idArticleEntry', { idArticleEntry })
            .execute();
    }
    async saveMany(articleEntryDetails) {
        return this.repository.save(articleEntryDetails);
    }
};
ArticleEntryDetailsRepository = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(article_entry_details_1.ArticleEntryDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ArticleEntryDetailsRepository);
exports.ArticleEntryDetailsRepository = ArticleEntryDetailsRepository;
//# sourceMappingURL=article-entry-details.repository.js.map