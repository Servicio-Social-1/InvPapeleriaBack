"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleExitModule = void 0;
const common_1 = require("@nestjs/common");
const article_exit_service_1 = require("./article-exit.service");
const article_exit_controller_1 = require("./article-exit.controller");
const typeorm_1 = require("@nestjs/typeorm");
const article_exit_entity_1 = require("./entities/article-exit.entity");
const article_exit_details_entity_1 = require("./entities/article-exit-details.entity");
const shared_module_1 = require("../shared/shared.module");
const area_module_1 = require("../area/area.module");
const auth_module_1 = require("../auth/auth.module");
const petitioner_module_1 = require("../petitioner/petitioner.module");
const article_exit_details_repository_1 = require("./repository/article-exit-details.repository");
const article_exit_repository_1 = require("./repository/article-exit.repository");
const articles_module_1 = require("../articles/articles.module");
let ArticleExitModule = class ArticleExitModule {
};
ArticleExitModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([article_exit_entity_1.ArticleExit, article_exit_details_entity_1.ArticleExitDetail]),
            shared_module_1.SharedModule,
            area_module_1.AreaModule,
            auth_module_1.AuthModule,
            articles_module_1.ArticlesModule,
            petitioner_module_1.PetitionerModule,
        ],
        controllers: [article_exit_controller_1.ArticleExitController],
        providers: [
            article_exit_service_1.ArticleExitService,
            article_exit_repository_1.ArticleExitRepository,
            article_exit_details_repository_1.ArticleExitDetailsRepository,
        ],
        exports: [typeorm_1.TypeOrmModule, article_exit_service_1.ArticleExitService],
    })
], ArticleExitModule);
exports.ArticleExitModule = ArticleExitModule;
//# sourceMappingURL=article-exit.module.js.map