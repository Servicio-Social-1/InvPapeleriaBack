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
exports.ArticleExitDetailsRepository = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const article_exit_details_entity_1 = require("../entities/article-exit-details.entity");
let ArticleExitDetailsRepository = class ArticleExitDetailsRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async create({ article, articleExit, amount, }) {
        const articleExitDetail = this.createEntityInstance({
            article,
            articleExit,
            amount,
        });
        return await this.saveEntityInstance(articleExitDetail);
    }
    async saveEntityInstance(articleExitDetail) {
        return await this.repository.save(articleExitDetail);
    }
    createEntityInstance({ article, articleExit, amount, }) {
        return this.repository.create({
            article,
            articleExit,
            amount,
        });
    }
    async deleteAllById(idArticleExit) {
        return await this.repository
            .createQueryBuilder()
            .delete()
            .from(article_exit_details_entity_1.ArticleExitDetail)
            .where('articleExitId = :idArticleExit', { idArticleExit })
            .execute();
    }
    async saveMany(articleExitDetails) {
        return this.repository.save(articleExitDetails);
    }
};
ArticleExitDetailsRepository = __decorate([
    __param(0, typeorm_1.InjectRepository(article_exit_details_entity_1.ArticleExitDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ArticleExitDetailsRepository);
exports.ArticleExitDetailsRepository = ArticleExitDetailsRepository;
//# sourceMappingURL=article-exit-details.repository.js.map