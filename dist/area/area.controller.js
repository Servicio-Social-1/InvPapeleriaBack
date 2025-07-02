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
exports.AreaController = void 0;
const common_1 = require("@nestjs/common");
const area_service_1 = require("./area.service");
const create_area_dto_1 = require("./dto/create-area.dto");
const update_area_dto_1 = require("./dto/update-area.dto");
const admin_role_guard_1 = require("../auth/guards/admin-role.guard");
const user_role_guard_1 = require("../auth/guards/user-role.guard");
const roles_enum_1 = require("../auth/enum/roles.enum");
const decorators_1 = require("../auth/decorators");
const passport_1 = require("@nestjs/passport");
let AreaController = class AreaController {
    constructor(areaService) {
        this.areaService = areaService;
    }
    create(createAreaDto) {
        return this.areaService.create(createAreaDto);
    }
    findAll() {
        return this.areaService.findAll();
    }
    update(id, updateAreaDto) {
        return this.areaService.update(id, updateAreaDto);
    }
    remove(id) {
        return this.areaService.remove(id);
    }
};
__decorate([
    common_1.Post(),
    decorators_1.Auth(user_role_guard_1.UserRoleGuard, [roles_enum_1.AvailableRoles.ADMIN, roles_enum_1.AvailableRoles.USER]),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_area_dto_1.CreateAreaDto]),
    __metadata("design:returntype", void 0)
], AreaController.prototype, "create", null);
__decorate([
    common_1.Get(),
    common_1.UseGuards(passport_1.AuthGuard()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AreaController.prototype, "findAll", null);
__decorate([
    common_1.Patch(':id'),
    decorators_1.Auth(admin_role_guard_1.AdminRoleGuard, roles_enum_1.AvailableRoles.ADMIN),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_area_dto_1.UpdateAreaDto]),
    __metadata("design:returntype", void 0)
], AreaController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    decorators_1.Auth(admin_role_guard_1.AdminRoleGuard, roles_enum_1.AvailableRoles.ADMIN),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AreaController.prototype, "remove", null);
AreaController = __decorate([
    common_1.Controller('area'),
    __metadata("design:paramtypes", [area_service_1.AreaService])
], AreaController);
exports.AreaController = AreaController;
//# sourceMappingURL=area.controller.js.map