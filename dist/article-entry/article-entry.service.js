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
exports.ArticleEntryService = void 0;
const common_1 = require("@nestjs/common");
const article_entry_repository_1 = require("./repository/article-entry.repository");
const article_entry_details_repository_1 = require("./repository/article-entry-details.repository");
const user_service_1 = require("../auth/user/user.service");
const articles_service_1 = require("../articles/articles.service");
const db_error_handler_service_1 = require("../shared/services/db-error-handler/db-error-handler.service");
let ArticleEntryService = class ArticleEntryService {
    constructor(articleEntryRepository, articleEntryDetailsRepository, dbErrorHandlerService, userService, articleService) {
        this.articleEntryRepository = articleEntryRepository;
        this.articleEntryDetailsRepository = articleEntryDetailsRepository;
        this.dbErrorHandlerService = dbErrorHandlerService;
        this.userService = userService;
        this.articleService = articleService;
    }
    async create(createArticleEntryDto) {
        const user = await this.userService.findById(createArticleEntryDto.idUser);
        const articleEntry = await this.articleEntryRepository.createArticleEntry(user);
        const articleEntryDetails = await this.createArticleEntryDetails(createArticleEntryDto, articleEntry);
        return articleEntryDetails;
    }
    async createArticleEntryDetails(createArticleEntryDto, articleEntry) {
        const articleEntryDetails = await Promise.all(createArticleEntryDto.articleEntryDetails.map(async (articleDetail) => this.articleEntryDetailsRepository.createEntityInstance({
            amount: articleDetail.amount,
            articleEntry,
            article: await this.articleService.findById(articleDetail.idArticle),
        })));
        return await this.articleEntryDetailsRepository.saveMany(articleEntryDetails);
    }
    async findAll(paginationDto) {
        return this.articleEntryRepository.findAll(paginationDto);
    }
    async count() {
        return await this.articleEntryRepository.count();
    }
    async findByName(name, paginationDto) {
        return await this.articleEntryRepository.findByArticleName(name, paginationDto);
    }
    async findOneById(id) {
        const articleEntry = await this.articleEntryRepository.findOneById(id);
        if (!articleEntry || !articleEntry.status) {
            throw new common_1.NotFoundException(`No se encontró la entrada de artículo con el id: ${id}`);
        }
        return articleEntry;
    }
    async findById(id) {
        const articleEntries = await this.articleEntryRepository.findById(id);
        if (!articleEntries.length || !articleEntries[0].status) {
            throw new common_1.NotFoundException(`No se encontró la entrada de artículo con el id: ${id}`);
        }
        return articleEntries[0];
    }
    async update(id, createArticleEntryDto) {
        if (!createArticleEntryDto.articleEntryDetails.length) {
            throw new common_1.BadRequestException('No has agregado detalles para actualizar');
        }
        const articleEntry = await this.findById(id);
        await this.articleEntryDetailsRepository.deleteAllById(id);
        const articleEntryDetails = await this.createArticleEntryDetails(createArticleEntryDto, articleEntry);
        return articleEntryDetails;
    }
    async remove(id) {
        const articleEntry = await this.findById(id);
        if (!articleEntry) {
            throw new common_1.NotFoundException(`No se encontró la entrada del artículo con el id: ${id}`);
        }
        if (!articleEntry.status) {
            throw new common_1.BadRequestException(`El artículo con el id: ${articleEntry.id} ya se encuentra eliminado`);
        }
        const { affected } = await this.articleEntryRepository.delete(id);
        if (affected === 1) {
            return {
                message: `Artículo ${articleEntry.id} eliminado correctamente.`,
            };
        }
    }
};
ArticleEntryService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [article_entry_repository_1.ArticleEntryRepository,
        article_entry_details_repository_1.ArticleEntryDetailsRepository,
        db_error_handler_service_1.DbErrorHandlerService,
        user_service_1.UserService,
        articles_service_1.ArticlesService])
], ArticleEntryService);
exports.ArticleEntryService = ArticleEntryService;
//# sourceMappingURL=article-entry.service.js.map