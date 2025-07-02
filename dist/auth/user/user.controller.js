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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const pagination_dto_1 = require("../../shared/dto/pagination.dto");
const user_service_1 = require("./user.service");
const update_user_dto_1 = require("../dto/update-user.dto");
const roles_enum_1 = require("../enum/roles.enum");
const admin_role_guard_1 = require("../guards/admin-role.guard");
const decorators_1 = require("../decorators");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    findAll(paginationDto) {
        return this.userService.findAll(paginationDto);
    }
    findById(id) {
        return this.userService.findById(id);
    }
    count() {
        return this.userService.count();
    }
    findAllByRole(role, paginationDto) {
        return this.userService.findAllByRole(role, paginationDto);
    }
    update(id, updateArticleDto) {
        return this.userService.update(id, updateArticleDto);
    }
    remove(id) {
        return this.userService.remove(id);
    }
};
__decorate([
    common_1.Get(),
    decorators_1.Auth(admin_role_guard_1.AdminRoleGuard, roles_enum_1.AvailableRoles.ADMIN),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    common_1.Get('byid/:id'),
    decorators_1.Auth(admin_role_guard_1.AdminRoleGuard, roles_enum_1.AvailableRoles.ADMIN),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findById", null);
__decorate([
    common_1.Get('count'),
    decorators_1.Auth(admin_role_guard_1.AdminRoleGuard, roles_enum_1.AvailableRoles.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "count", null);
__decorate([
    common_1.Get(':role'),
    decorators_1.Auth(admin_role_guard_1.AdminRoleGuard, roles_enum_1.AvailableRoles.ADMIN),
    __param(0, common_1.Param('role')),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAllByRole", null);
__decorate([
    common_1.Patch(':id'),
    decorators_1.Auth(admin_role_guard_1.AdminRoleGuard, roles_enum_1.AvailableRoles.ADMIN),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    decorators_1.Auth(admin_role_guard_1.AdminRoleGuard, roles_enum_1.AvailableRoles.ADMIN),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
UserController = __decorate([
    common_1.Controller('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map