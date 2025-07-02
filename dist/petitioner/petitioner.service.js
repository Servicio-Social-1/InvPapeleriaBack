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
exports.PetitionerService = void 0;
const common_1 = require("@nestjs/common");
const petitioner_repository_1 = require("./repository/petitioner.repository");
const db_error_handler_service_1 = require("../shared/services/db-error-handler/db-error-handler.service");
const area_service_1 = require("../area/area.service");
let PetitionerService = class PetitionerService {
    constructor(petitionerRepository, areaService, dbErrorHandlerService) {
        this.petitionerRepository = petitionerRepository;
        this.areaService = areaService;
        this.dbErrorHandlerService = dbErrorHandlerService;
    }
    async create(createPetitionerDto) {
        const area = await this.areaService.findById(createPetitionerDto.area);
        try {
            return await this.petitionerRepository.create(createPetitionerDto, area);
        }
        catch (error) {
            this.dbErrorHandlerService.handleError(error, `El solicitante ${createPetitionerDto.name} ya existe`);
        }
    }
    async findAllByAreaId(areaId) {
        const petitioners = await this.petitionerRepository.findAllByArea(areaId);
        if (petitioners.length === 0) {
            throw new common_1.NotFoundException('Aún no hay solicitantes');
        }
        return petitioners;
    }
    async findAll() {
        const petitioners = await this.petitionerRepository.findAll();
        if (petitioners.length === 0) {
            throw new common_1.NotFoundException('Aún no hay solicitantes');
        }
        return petitioners;
    }
    async findById(id) {
        const petitioner = await this.petitionerRepository.findById(id);
        if (!petitioner || !petitioner.status) {
            throw new common_1.NotFoundException(`No se encontró el solicitante con el id: ${id}`);
        }
        return petitioner;
    }
    async update(id, updatePetitionerDto) {
        const petitioner = await this.findById(id);
        const area = await this.areaService.findById(updatePetitionerDto.area);
        try {
            await this.petitionerRepository.update(id, area, updatePetitionerDto);
            return {
                message: `Solicitante ${petitioner.name} actualizado correctamente.`,
            };
        }
        catch (error) {
            this.dbErrorHandlerService.handleError(error, `El solicitante con la descripción ${updatePetitionerDto.name} ya existe`);
        }
    }
    async remove(id) {
        const petitioner = await this.findById(id);
        if (!petitioner.status) {
            throw new common_1.BadRequestException(`El solicitante con el id: ${petitioner.name} ya se encuentra eliminado`);
        }
        const { affected } = await this.petitionerRepository.delete(id);
        if (affected === 1) {
            return {
                message: `solicitante ${petitioner.name} se eliminó correctamente.`,
            };
        }
    }
};
PetitionerService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [petitioner_repository_1.PetitionerRepository,
        area_service_1.AreaService,
        db_error_handler_service_1.DbErrorHandlerService])
], PetitionerService);
exports.PetitionerService = PetitionerService;
//# sourceMappingURL=petitioner.service.js.map