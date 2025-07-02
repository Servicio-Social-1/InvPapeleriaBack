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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const pagination_dto_1 = require("../shared/dto/pagination.dto");
const user_service_1 = require("./user/user.service");
const update_user_role_dto_1 = require("./dto/update-user-role.dto");
const login_user_dto_copy_1 = require("./dto/login-user.dto copy");
const user_entity_1 = require("./entities/user.entity");
const decorators_1 = require("./decorators");
const roles_enum_1 = require("./enum/roles.enum");
const admin_role_guard_1 = require("./guards/admin-role.guard");
const user_role_guard_1 = require("./guards/user-role.guard");
const token_tdo_1 = require("./dto/token.tdo");
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    register(createUserDto) {
        return this.authService.register(createUserDto);
    }
    login(loginUserDto) {
        return this.authService.login(loginUserDto);
    }
    checkUserStatus(user) {
        console.log('checkUserStatus - Usuario:', user);
        console.log('checkUserStatus - Rol:', user?.role?.name);
        return this.authService.checkAuthStatus(user);
    }
    checkAdminStatus(user) {
        return this.authService.checkAuthStatus(user);
    }
    hasSession(tokenDto) {
        return this.authService.hasSession(tokenDto);
    }
    findAll(paginationDto) {
        return this.userService.findAll(paginationDto);
    }
    findOne(term) {
        return this.userService.findOne(term);
    }
    update(id, updateUserDto) {
        return this.userService.update(id, updateUserDto);
    }
    updateUserWithRole(id, updateUserWithRoleDto) {
        return this.userService.updateUserWithRole(id, updateUserWithRoleDto);
    }
    remove(id) {
        return this.userService.remove(id);
    }
};
__decorate([
    common_1.Post('register'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_copy_1.LoginUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    common_1.Get('check-user-status'),
    decorators_1.Auth(user_role_guard_1.UserRoleGuard, [roles_enum_1.AvailableRoles.USER, roles_enum_1.AvailableRoles.ADMIN]),
    __param(0, decorators_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "checkUserStatus", null);
__decorate([
    common_1.Get('check-admin-status'),
    decorators_1.Auth(admin_role_guard_1.AdminRoleGuard, roles_enum_1.AvailableRoles.ADMIN),
    __param(0, decorators_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "checkAdminStatus", null);
__decorate([
    common_1.Post('logged-in'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [token_tdo_1.TokenDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "hasSession", null);
__decorate([
    common_1.Get(),
    decorators_1.Auth(user_role_guard_1.UserRoleGuard, [roles_enum_1.AvailableRoles.USER, roles_enum_1.AvailableRoles.ADMIN]),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "findAll", null);
__decorate([
    common_1.Get(':term'),
    decorators_1.Auth(admin_role_guard_1.AdminRoleGuard, roles_enum_1.AvailableRoles.ADMIN),
    __param(0, common_1.Param('term')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "findOne", null);
__decorate([
    common_1.Patch(':id'),
    decorators_1.Auth(user_role_guard_1.UserRoleGuard, roles_enum_1.AvailableRoles.USER),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "update", null);
__decorate([
    common_1.Patch('admin/:id'),
    decorators_1.Auth(admin_role_guard_1.AdminRoleGuard, roles_enum_1.AvailableRoles.ADMIN),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_role_dto_1.UpdateUserRoleDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updateUserWithRole", null);
__decorate([
    common_1.Delete(':id'),
    decorators_1.Auth(admin_role_guard_1.AdminRoleGuard, roles_enum_1.AvailableRoles.ADMIN),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "remove", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map