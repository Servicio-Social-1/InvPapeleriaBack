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
exports.ArticleExit = void 0;
const typeorm_1 = require("typeorm");
const petitioner_entity_1 = require("../../petitioner/entities/petitioner.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
const area_entity_1 = require("../../area/entities/area.entity");
const article_exit_details_entity_1 = require("./article-exit-details.entity");
let ArticleExit = class ArticleExit {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ArticleExit.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], ArticleExit.prototype, "date", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], ArticleExit.prototype, "time", void 0);
__decorate([
    typeorm_1.Column({
        type: 'bool',
        default: true,
    }),
    __metadata("design:type", Boolean)
], ArticleExit.prototype, "status", void 0);
__decorate([
    typeorm_1.OneToMany(() => article_exit_details_entity_1.ArticleExitDetail, (articleExitDetail) => articleExitDetail.articleExit),
    __metadata("design:type", Array)
], ArticleExit.prototype, "articleExitDetail", void 0);
__decorate([
    typeorm_1.ManyToOne(() => petitioner_entity_1.Petitioner, (petitioner) => petitioner.articleExit, {
        eager: true,
        cascade: true,
    }),
    __metadata("design:type", petitioner_entity_1.Petitioner)
], ArticleExit.prototype, "petitioner", void 0);
__decorate([
    typeorm_1.ManyToOne(() => area_entity_1.Area, (area) => area.articleExit, {
        eager: true,
        cascade: true,
    }),
    __metadata("design:type", area_entity_1.Area)
], ArticleExit.prototype, "area", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, (user) => user.articleExit, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", user_entity_1.User)
], ArticleExit.prototype, "user", void 0);
ArticleExit = __decorate([
    typeorm_1.Entity()
], ArticleExit);
exports.ArticleExit = ArticleExit;
//# sourceMappingURL=article-exit.entity.js.map