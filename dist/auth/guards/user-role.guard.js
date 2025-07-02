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
var UserRoleGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const role_service_1 = require("../role/role.service");
const metadata_roles_1 = require("../enum/metadata_roles");
let UserRoleGuard = UserRoleGuard_1 = class UserRoleGuard {
    constructor(reflector, roleService) {
        this.reflector = reflector;
        this.roleService = roleService;
        this.logger = new common_1.Logger(UserRoleGuard_1.name);
    }
    async canActivate(context) {
        const validRole = this.reflector.get(metadata_roles_1.META_ROLES, context.getHandler());
        const req = context.switchToHttp().getRequest();
        this.logger.debug(`Roles permitidos para la ruta: ${JSON.stringify(validRole)}`);
        this.logger.debug(`Usuario en request: ${JSON.stringify(req.user)}`);
        return await this.roleService.rolesValidator({
            validRole,
            context,
        });
    }
};
UserRoleGuard = UserRoleGuard_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Reflector,
        role_service_1.RoleService])
], UserRoleGuard);
exports.UserRoleGuard = UserRoleGuard;
//# sourceMappingURL=user-role.guard.js.map