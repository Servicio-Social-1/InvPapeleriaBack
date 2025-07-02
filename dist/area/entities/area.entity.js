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
exports.Area = void 0;
const typeorm_1 = require("typeorm");
const petitioner_entity_1 = require("../../petitioner/entities/petitioner.entity");
const article_exit_entity_1 = require("../../article-exit/entities/article-exit.entity");
let Area = class Area {
    checkSlugInsert() {
        this.name = this.name.trim();
    }
    checkSlugUpdate() {
        this.name = this.name.trim();
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Area.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 100,
        unique: true,
    }),
    __metadata("design:type", String)
], Area.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({
        type: 'bool',
        default: true,
    }),
    __metadata("design:type", Boolean)
], Area.prototype, "status", void 0);
__decorate([
    typeorm_1.OneToMany(() => petitioner_entity_1.Petitioner, (petitioner) => petitioner.area),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], Area.prototype, "petitioner", void 0);
__decorate([
    typeorm_1.OneToMany(() => article_exit_entity_1.ArticleExit, (articleExit) => articleExit.area),
    __metadata("design:type", Array)
], Area.prototype, "articleExit", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Area.prototype, "checkSlugInsert", null);
__decorate([
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Area.prototype, "checkSlugUpdate", null);
Area = __decorate([
    typeorm_1.Entity('areas')
], Area);
exports.Area = Area;
//# sourceMappingURL=area.entity.js.map