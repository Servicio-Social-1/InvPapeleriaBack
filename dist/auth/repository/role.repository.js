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
exports.RoleRepository = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const role_entity_1 = require("../entities/role.entity");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
let RoleRepository = class RoleRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async create(name) {
        const role = this.repository.create(name);
        return await this.repository.save(role);
    }
    async update(id, name) {
        return await this.repository.update(id, name);
    }
    async findOneByName(name) {
        return await this.repository.findOneBy({ name });
    }
    async findOneById(id) {
        return await this.repository.findOneBy({ id });
    }
    async findAll() {
        return await this.repository.find();
    }
};
RoleRepository = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RoleRepository);
exports.RoleRepository = RoleRepository;
//# sourceMappingURL=role.repository.js.map