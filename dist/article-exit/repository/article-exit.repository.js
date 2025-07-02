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
exports.ArticleExitRepository = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const article_exit_entity_1 = require("../entities/article-exit.entity");
let ArticleExitRepository = class ArticleExitRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async createArticleExit({ petitioner, area, user, }) {
        const articleExit = this.repository.create({ petitioner, area, user, date: new Date() + '', time: new Date() + '' });
        return await this.repository.save(articleExit);
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
                articleExitDetail: true,
            },
            order: {
                id: 'ASC',
            },
        });
    }
    async findOneById(id) {
        return await this.repository.findOne({
            where: { id },
            relations: {
                articleExitDetail: true,
                area: true,
                petitioner: true,
            },
        });
    }
    async findById(id) {
        return await this.repository.find({
            where: { id },
            relations: {
                articleExitDetail: true,
                area: true,
                petitioner: true,
            },
        });
    }
    async count() {
        return this.repository.count({ where: { status: true } });
    }
    async findByTerm(term, paginationDto) {
        const { limit = 25, offset = 0 } = paginationDto;
        return await this.repository.find({
            where: [
                { area: { name: typeorm_2.ILike(`%${term}%`) }, status: true },
                { petitioner: { name: typeorm_2.ILike(`%${term}%`) }, status: true },
                { user: { email: typeorm_2.ILike(`%${term}%`) }, status: true },
                { user: { name: typeorm_2.ILike(`%${term}%`) }, status: true },
            ],
            skip: offset, order: { id: 'ASC' }, take: limit
        });
    }
    async delete(id) {
        return await this.repository.update({ id }, { status: false });
    }
};
ArticleExitRepository = __decorate([
    __param(0, typeorm_1.InjectRepository(article_exit_entity_1.ArticleExit)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ArticleExitRepository);
exports.ArticleExitRepository = ArticleExitRepository;
//# sourceMappingURL=article-exit.repository.js.map