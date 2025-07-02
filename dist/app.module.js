"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const articles_module_1 = require("./articles/articles.module");
const article_entry_module_1 = require("./article-entry/article-entry.module");
const article_exit_module_1 = require("./article-exit/article-exit.module");
const auth_module_1 = require("./auth/auth.module");
const petitioner_module_1 = require("./petitioner/petitioner.module");
const area_module_1 = require("./area/area.module");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const shared_module_1 = require("./shared/shared.module");
const seed_module_1 = require("./seed/seed.module");
const pdf_generator_module_1 = require("./pdf-generator/pdf-generator.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST,
                port: +process.env.DB_PORT,
                database: process.env.DB_NAME,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                autoLoadEntities: true,
                synchronize: process.env.STAGE === 'dev',
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path_1.join(__dirname, '..', 'public'),
            }),
            articles_module_1.ArticlesModule,
            article_entry_module_1.ArticleEntryModule,
            article_exit_module_1.ArticleExitModule,
            auth_module_1.AuthModule,
            petitioner_module_1.PetitionerModule,
            area_module_1.AreaModule,
            shared_module_1.SharedModule,
            seed_module_1.SeedModule,
            pdf_generator_module_1.PdfGeneratorModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map