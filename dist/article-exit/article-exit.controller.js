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
exports.ArticleExitController = void 0;
const common_1 = require("@nestjs/common");
const article_exit_service_1 = require("./article-exit.service");
const create_article_exit_dto_1 = require("./dto/create-article-exit/create-article-exit.dto");
const pagination_dto_1 = require("../shared/dto/pagination.dto");
const passport_1 = require("@nestjs/passport");
let ArticleExitController = class ArticleExitController {
    constructor(articleExitService) {
        this.articleExitService = articleExitService;
    }
    create(createArticleExitDto) {
        return this.articleExitService.create(createArticleExitDto);
    }
    findAll(paginationDto) {
        return this.articleExitService.findAll(paginationDto);
    }
    count() {
        return this.articleExitService.count();
    }
    findByArticleName(name, paginationDto) {
        return this.articleExitService.findByTerm(name, paginationDto);
    }
    getById(id) {
        return this.articleExitService.findById(id);
    }
    update(id, createArticleExitDto) {
        return this.articleExitService.update(id, createArticleExitDto);
    }
    remove(id) {
        return this.articleExitService.remove(id);
    }
};
__decorate([
    common_1.Post(),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_article_exit_dto_1.CreateArticleExitDto]),
    __metadata("design:returntype", void 0)
], ArticleExitController.prototype, "create", null);
__decorate([
    common_1.Get(),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ArticleExitController.prototype, "findAll", null);
__decorate([
    common_1.Get('count'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ArticleExitController.prototype, "count", null);
__decorate([
    common_1.Get(':name'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('name')),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ArticleExitController.prototype, "findByArticleName", null);
__decorate([
    common_1.Get('byid/:id'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ArticleExitController.prototype, "getById", null);
__decorate([
    common_1.Patch(':id'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_article_exit_dto_1.CreateArticleExitDto]),
    __metadata("design:returntype", void 0)
], ArticleExitController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ArticleExitController.prototype, "remove", null);
ArticleExitController = __decorate([
    common_1.Controller('article-exit'),
    __metadata("design:paramtypes", [article_exit_service_1.ArticleExitService])
], ArticleExitController);
exports.ArticleExitController = ArticleExitController;
//# sourceMappingURL=article-exit.controller.js.map