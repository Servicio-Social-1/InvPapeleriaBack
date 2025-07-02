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
exports.Role = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const roles_enum_1 = require("../enum/roles.enum");
let Role = class Role {
    checkNameInsert() {
        this.name = this.name
            .toUpperCase()
            .replace(new RegExp(' ', 'g'), '_')
            .replace(new RegExp('\'', 'g'), '');
    }
    checkNameUpdate() {
        this.name = this.name
            .toUpperCase()
            .replace(new RegExp(' ', 'g'), '_')
            .replace(new RegExp('\'', 'g'), '');
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Role.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 100,
        default: roles_enum_1.AvailableRoles.USER,
        unique: true,
    }),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    typeorm_1.OneToMany(() => user_entity_1.User, (user) => user.role),
    __metadata("design:type", user_entity_1.User)
], Role.prototype, "user", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Role.prototype, "checkNameInsert", null);
__decorate([
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Role.prototype, "checkNameUpdate", null);
Role = __decorate([
    typeorm_1.Entity('roles')
], Role);
exports.Role = Role;
//# sourceMappingURL=role.entity.js.map