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
exports.ArticlesService = void 0;
const common_1 = require("@nestjs/common");
const articles_repository_1 = require("./repository/articles/articles.repository");
const db_error_handler_service_1 = require("../shared/services/db-error-handler/db-error-handler.service");
let ArticlesService = class ArticlesService {
    constructor(articlesRepository, dbErrorHandlerService) {
        this.articlesRepository = articlesRepository;
        this.dbErrorHandlerService = dbErrorHandlerService;
    }
    async create(createArticleDto) {
        try {
            return await this.articlesRepository.create(createArticleDto);
        }
        catch (error) {
            this.dbErrorHandlerService.handleError(error, `El artículo con la descripción ${createArticleDto.description} ya existe`);
        }
    }
    async findAllPaginated(paginationDto) {
        const articles = await this.articlesRepository.findAllPaginated(paginationDto);
        if (articles.length === 0) {
            throw new common_1.BadRequestException('Aún no existen artículos');
        }
        return articles;
    }
    async findAll() {
        const articles = await this.articlesRepository.findAll();
        if (articles.length === 0) {
            throw new common_1.BadRequestException('Aún no existen artículos');
        }
        return articles;
    }
    async findById(id) {
        const article = await this.articlesRepository.findByIdAnyStatus(id);
        if (!article) {
            throw new common_1.NotFoundException(`No se encontró el artículo con el id: ${id}`);
        }
        return article;
    }
    async findByidOrName(term, paginationDto) {
        let articleOrArticles;
        if (!isNaN(+term)) {
            articleOrArticles = await this.findById(+term);
        }
        else {
            articleOrArticles = await this.articlesRepository.findByDescription(term, paginationDto);
        }
        if (!articleOrArticles && !articleOrArticles.length) {
            throw new common_1.NotFoundException(`No se encontró el articulo con el id o descripción: ${term}`);
        }
        return articleOrArticles;
    }
    async count() {
        return await this.articlesRepository.count();
    }
    async update(id, updateArticleDto) {
        const article = await this.findById(id);
        try {
            await this.articlesRepository.update(id, updateArticleDto);
            return {
                message: `Artículo ${updateArticleDto.description} actualizado correctamente.`,
            };
        }
        catch (error) {
            this.dbErrorHandlerService.handleError(error, `El artículo con la descripción ${updateArticleDto.description} ya existe`);
        }
    }
    async remove(id) {
        const article = await this.articlesRepository.findByIdAnyStatus(id);
        if (!article) {
            throw new common_1.NotFoundException(`No se encontró el articulo con el id: ${id}`);
        }
        const result = await this.articlesRepository.delete(id);
        if (result.affected === 1) {
            return {
                message: `Artículo ${article.description} eliminado correctamente.`,
            };
        }
        else {
            throw new common_1.NotFoundException(`No se pudo eliminar el artículo con id: ${id}`);
        }
    }
};
ArticlesService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [articles_repository_1.ArticlesRepository,
        db_error_handler_service_1.DbErrorHandlerService])
], ArticlesService);
exports.ArticlesService = ArticlesService;
//# sourceMappingURL=articles.service.js.map