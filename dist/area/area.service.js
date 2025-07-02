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
exports.AreaService = void 0;
const common_1 = require("@nestjs/common");
const area_repository_1 = require("./repository/area.repository");
const db_error_handler_service_1 = require("../shared/services/db-error-handler/db-error-handler.service");
let AreaService = class AreaService {
    constructor(areaRepository, dbErrorHandlerService) {
        this.areaRepository = areaRepository;
        this.dbErrorHandlerService = dbErrorHandlerService;
    }
    async create(createAreaDto) {
        try {
            return await this.areaRepository.create(createAreaDto);
        }
        catch (error) {
            this.dbErrorHandlerService.handleError(error, `El área con el nombre ${createAreaDto.name} ya existe`);
        }
    }
    async findAll() {
        const areas = await this.areaRepository.findAll();
        if (areas.length === 0) {
            throw new common_1.BadRequestException('Aún no existen áreas');
        }
        return areas;
    }
    async findById(id) {
        const area = await this.areaRepository.findById(id);
        if (!area || !area.status) {
            throw new common_1.NotFoundException(`No se encontró el área con el id: ${id}`);
        }
        return area;
    }
    async update(id, updateAreaDto) {
        const area = await this.findById(id);
        try {
            await this.areaRepository.update(id, updateAreaDto);
            return {
                message: `Area ${area.name} actualizado correctamente.`,
            };
        }
        catch (error) {
            this.dbErrorHandlerService.handleError(error, `El área con la descripción ${updateAreaDto.name} ya existe`);
        }
    }
    async remove(id) {
        const area = await this.findById(id);
        if (!area) {
            throw new common_1.BadRequestException(`El área con el id: ${id} no existe`);
        }
        const { affected } = await this.areaRepository.delete(id);
        if (affected === 1) {
            return {
                message: `área ${area.name} se eliminó correctamente.`,
            };
        }
        else {
            throw new common_1.NotFoundException(`No se pudo eliminar el área con id: ${id}`);
        }
    }
};
AreaService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [area_repository_1.AreaRepository,
        db_error_handler_service_1.DbErrorHandlerService])
], AreaService);
exports.AreaService = AreaService;
//# sourceMappingURL=area.service.js.map