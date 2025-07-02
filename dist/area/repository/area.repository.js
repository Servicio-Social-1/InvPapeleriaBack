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
exports.AreaRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const area_entity_1 = require("../entities/area.entity");
const typeorm_2 = require("typeorm");
let AreaRepository = class AreaRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async create(createAreaDto) {
        const area = await this.repository.create(createAreaDto);
        return await this.repository.save(area);
    }
    async findAll() {
        return await this.repository.find({ order: { id: 'ASC' }, where: { status: true } });
    }
    async findById(id) {
        return await this.repository.findOneBy({ id });
    }
    async update(id, updateAreaDto) {
        return await this.repository.update(id, { id, ...updateAreaDto });
    }
    async delete(id) {
        return await this.repository.delete(id);
    }
};
AreaRepository = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(area_entity_1.Area)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AreaRepository);
exports.AreaRepository = AreaRepository;
//# sourceMappingURL=area.repository.js.map