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
exports.PetitionerRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const petitioner_entity_1 = require("../entities/petitioner.entity");
let PetitionerRepository = class PetitionerRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async create(createPetitionerDto, area) {
        const petitioner = this.repository.create({
            ...createPetitionerDto,
            area,
        });
        return await this.repository.save(petitioner);
    }
    async findAllByArea(areaId) {
        return await this.repository
            .createQueryBuilder('petitioner')
            .innerJoinAndSelect('petitioner.area', 'area')
            .where('area.id = :areaId', { areaId })
            .andWhere('petitioner.status = true')
            .execute();
    }
    async findAll() {
        return await this.repository.find({
            where: {
                status: true,
            },
        });
    }
    async findById(id) {
        return await this.repository.findOneBy({ id });
    }
    async update(id, area, updatePetitionerDto) {
        return await this.repository.update({ id }, { area, name: updatePetitionerDto.name });
    }
    async delete(id) {
        return await this.repository.update({ id }, { status: false });
    }
};
PetitionerRepository = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(petitioner_entity_1.Petitioner)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PetitionerRepository);
exports.PetitionerRepository = PetitionerRepository;
//# sourceMappingURL=petitioner.repository.js.map