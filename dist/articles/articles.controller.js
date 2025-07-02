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
exports.ArticlesController = void 0;
const common_1 = require("@nestjs/common");
const articles_service_1 = require("./articles.service");
const create_article_dto_1 = require("./dto/create-article.dto");
const update_article_dto_1 = require("./dto/update-article.dto");
const pagination_dto_1 = require("../shared/dto/pagination.dto");
const decorators_1 = require("../auth/decorators");
const admin_role_guard_1 = require("../auth/guards/admin-role.guard");
const roles_enum_1 = require("../auth/enum/roles.enum");
const passport_1 = require("@nestjs/passport");
let ArticlesController = class ArticlesController {
    constructor(articlesService) {
        this.articlesService = articlesService;
    }
    create(createArticleDto) {
        return this.articlesService.create(createArticleDto);
    }
    findAll(paginationDto) {
        return this.articlesService.findAllPaginated(paginationDto);
    }
    count() {
        return this.articlesService.count();
    }
    findByidOrName(term, paginationDto) {
        return this.articlesService.findByidOrName(term, paginationDto);
    }
    update(id, updateArticleDto) {
        return this.articlesService.update(id, updateArticleDto);
    }
    remove(id) {
        return this.articlesService.remove(id);
    }
};
__decorate([
    common_1.Post(),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_article_dto_1.CreateArticleDto]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "create", null);
__decorate([
    common_1.Get(),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "findAll", null);
__decorate([
    common_1.Get('count'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "count", null);
__decorate([
    common_1.Get(':term'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('term')),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "findByidOrName", null);
__decorate([
    common_1.Patch(':id'),
    decorators_1.Auth(admin_role_guard_1.AdminRoleGuard, roles_enum_1.AvailableRoles.ADMIN),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_article_dto_1.UpdateArticleDto]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    decorators_1.Auth(admin_role_guard_1.AdminRoleGuard, roles_enum_1.AvailableRoles.ADMIN),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "remove", null);
ArticlesController = __decorate([
    common_1.Controller('articles'),
    __metadata("design:paramtypes", [articles_service_1.ArticlesService])
], ArticlesController);
exports.ArticlesController = ArticlesController;
//# sourceMappingURL=articles.controller.js.map