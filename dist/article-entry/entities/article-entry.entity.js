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
exports.ArticleEntry = void 0;
const typeorm_1 = require("typeorm");
const article_entry_details_1 = require("./article-entry-details");
const user_entity_1 = require("../../auth/entities/user.entity");
let ArticleEntry = class ArticleEntry {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ArticleEntry.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], ArticleEntry.prototype, "date", void 0);
__decorate([
    typeorm_1.Column({
        type: 'bool',
        default: true,
    }),
    __metadata("design:type", Boolean)
], ArticleEntry.prototype, "status", void 0);
__decorate([
    typeorm_1.OneToMany(() => article_entry_details_1.ArticleEntryDetail, (articleEntryDetail) => articleEntryDetail.articleEntry, { cascade: true }),
    __metadata("design:type", Array)
], ArticleEntry.prototype, "articleEntryDetail", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, (user) => user.articleEntry, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", user_entity_1.User)
], ArticleEntry.prototype, "user", void 0);
ArticleEntry = __decorate([
    typeorm_1.Entity('article_entries')
], ArticleEntry);
exports.ArticleEntry = ArticleEntry;
//# sourceMappingURL=article-entry.entity.js.map