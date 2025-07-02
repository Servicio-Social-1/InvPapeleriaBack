"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleEntryModule = void 0;
const common_1 = require("@nestjs/common");
const article_entry_service_1 = require("./article-entry.service");
const article_entry_controller_1 = require("./article-entry.controller");
const typeorm_1 = require("@nestjs/typeorm");
const article_entry_entity_1 = require("./entities/article-entry.entity");
const article_entry_details_1 = require("./entities/article-entry-details");
const article_entry_repository_1 = require("./repository/article-entry.repository");
const article_entry_details_repository_1 = require("./repository/article-entry-details.repository");
const auth_module_1 = require("../auth/auth.module");
const articles_module_1 = require("../articles/articles.module");
const shared_module_1 = require("../shared/shared.module");
let ArticleEntryModule = class ArticleEntryModule {
};
ArticleEntryModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([article_entry_entity_1.ArticleEntry, article_entry_details_1.ArticleEntryDetail]),
            auth_module_1.AuthModule,
            articles_module_1.ArticlesModule,
            shared_module_1.SharedModule,
            auth_module_1.AuthModule
        ],
        controllers: [article_entry_controller_1.ArticleEntryController],
        providers: [
            article_entry_service_1.ArticleEntryService,
            article_entry_repository_1.ArticleEntryRepository,
            article_entry_details_repository_1.ArticleEntryDetailsRepository,
        ],
        exports: [typeorm_1.TypeOrmModule],
    })
], ArticleEntryModule);
exports.ArticleEntryModule = ArticleEntryModule;
//# sourceMappingURL=article-entry.module.js.map