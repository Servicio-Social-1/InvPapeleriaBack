"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetitionerModule = void 0;
const common_1 = require("@nestjs/common");
const petitioner_service_1 = require("./petitioner.service");
const petitioner_controller_1 = require("./petitioner.controller");
const typeorm_1 = require("@nestjs/typeorm");
const petitioner_entity_1 = require("./entities/petitioner.entity");
const shared_module_1 = require("../shared/shared.module");
const petitioner_repository_1 = require("./repository/petitioner.repository");
const area_module_1 = require("../area/area.module");
const auth_module_1 = require("../auth/auth.module");
let PetitionerModule = class PetitionerModule {
};
PetitionerModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([petitioner_entity_1.Petitioner]), shared_module_1.SharedModule, area_module_1.AreaModule, auth_module_1.AuthModule],
        controllers: [petitioner_controller_1.PetitionerController],
        providers: [petitioner_service_1.PetitionerService, petitioner_repository_1.PetitionerRepository],
        exports: [typeorm_1.TypeOrmModule, petitioner_service_1.PetitionerService],
    })
], PetitionerModule);
exports.PetitionerModule = PetitionerModule;
//# sourceMappingURL=petitioner.module.js.map