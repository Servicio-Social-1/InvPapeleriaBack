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
exports.ArticleEntryController = void 0;
const common_1 = require("@nestjs/common");
const article_entry_service_1 = require("./article-entry.service");
const create_article_entry_dto_1 = require("./dto/create-article/create-article-entry.dto");
const common_2 = require("@nestjs/common");
const pagination_dto_1 = require("../shared/dto/pagination.dto");
const passport_1 = require("@nestjs/passport");
let ArticleEntryController = class ArticleEntryController {
    constructor(articleEntryService) {
        this.articleEntryService = articleEntryService;
    }
    create(createArticleEntryDto) {
        return this.articleEntryService.create(createArticleEntryDto);
    }
    findAll(paginationDto) {
        return this.articleEntryService.findAll(paginationDto);
    }
    count() {
        return this.articleEntryService.count();
    }
    findByArticleName(name, paginationDto) {
        return this.articleEntryService.findByName(name, paginationDto);
    }
    getById(id) {
        return this.articleEntryService.findById(id);
    }
    update(id, createArticleEntryDto) {
        return this.articleEntryService.update(id, createArticleEntryDto);
    }
    remove(id) {
        return this.articleEntryService.remove(id);
    }
};
__decorate([
    common_1.Post(),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Body(new common_2.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_article_entry_dto_1.CreateArticleEntryDto]),
    __metadata("design:returntype", void 0)
], ArticleEntryController.prototype, "create", null);
__decorate([
    common_1.Get(),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ArticleEntryController.prototype, "findAll", null);
__decorate([
    common_1.Get('count'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ArticleEntryController.prototype, "count", null);
__decorate([
    common_1.Get(':name'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('name')),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ArticleEntryController.prototype, "findByArticleName", null);
__decorate([
    common_1.Get('byid/:id'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ArticleEntryController.prototype, "getById", null);
__decorate([
    common_1.Patch(':id'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __param(1, common_1.Body(new common_2.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_article_entry_dto_1.CreateArticleEntryDto]),
    __metadata("design:returntype", void 0)
], ArticleEntryController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ArticleEntryController.prototype, "remove", null);
ArticleEntryController = __decorate([
    common_1.Controller('article-entry'),
    __metadata("design:paramtypes", [article_entry_service_1.ArticleEntryService])
], ArticleEntryController);
exports.ArticleEntryController = ArticleEntryController;
//# sourceMappingURL=article-entry.controller.js.map