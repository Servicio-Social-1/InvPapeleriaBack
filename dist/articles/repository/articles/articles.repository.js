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
exports.ArticlesRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const article_entity_1 = require("../../entities/article.entity");
let ArticlesRepository = class ArticlesRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async create(createArticleDto) {
        const article = this.repository.create(createArticleDto);
        return await this.repository.save(article);
    }
    async findById(id) {
        return await this.findByIdAnyStatus(id);
    }
    async findByIdAnyStatus(id) {
        return await this.repository.findOne({ where: { id } });
    }
    async findByDescription(descriptionLike, paginationDto) {
        const { limit = 20, offset = 0 } = paginationDto;
        return await this.repository.find({
            where: { description: typeorm_2.ILike(`%${descriptionLike}%`) },
            take: limit,
            skip: offset,
            order: {
                id: 'ASC',
            },
        });
    }
    async findAllPaginated(paginationDto) {
        const { limit = 20, offset = 0 } = paginationDto;
        return this.repository.find({
            take: limit,
            skip: offset,
            order: {
                id: 'ASC',
            },
        });
    }
    async findAll() {
        return this.repository.find({
            order: {
                id: 'ASC',
            },
        });
    }
    async count() {
        return await this.repository.count();
    }
    async update(id, updateArticleDto) {
        return await this.repository.update({ id }, { id, ...updateArticleDto });
    }
    async delete(id) {
        return await this.repository.delete(id);
    }
};
ArticlesRepository = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(article_entity_1.Article)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ArticlesRepository);
exports.ArticlesRepository = ArticlesRepository;
//# sourceMappingURL=articles.repository.js.map