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
exports.ArticleEntryRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const article_entry_entity_1 = require("../entities/article-entry.entity");
const typeorm_2 = require("typeorm");
let ArticleEntryRepository = class ArticleEntryRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async createArticleEntry(user) {
        const articleEntry = this.repository.create({ user });
        return await this.repository.save(articleEntry);
    }
    async findAll(paginationDto) {
        const { limit = 20, offset = 0 } = paginationDto;
        return this.repository.find({
            take: limit,
            skip: offset,
            where: {
                status: true,
            },
            relations: {
                articleEntryDetail: true,
            },
            order: {
                id: 'ASC',
            },
        });
    }
    async count() {
        return await this.repository.count({ where: { status: true } });
    }
    async findOneById(id) {
        return await this.repository.findOne({
            where: { id },
            relations: { articleEntryDetail: true },
        });
    }
    async findById(id) {
        return await this.repository.find({
            where: { id },
            relations: { articleEntryDetail: true },
        });
    }
    async findByArticleName(name, paginationDto) {
        const { limit = 20, offset = 0 } = paginationDto;
        return await this.repository.find({
            take: limit,
            skip: offset,
            where: {
                articleEntryDetail: {
                    article: { description: typeorm_2.ILike(`%${name}%`) },
                },
            },
            relations: {
                articleEntryDetail: true,
            },
        });
    }
    async delete(id) {
        return await this.repository.update({ id }, { status: false });
    }
};
ArticleEntryRepository = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(article_entry_entity_1.ArticleEntry)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ArticleEntryRepository);
exports.ArticleEntryRepository = ArticleEntryRepository;
//# sourceMappingURL=article-entry.repository.js.map