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
exports.AdminRoleGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const role_service_1 = require("../role/role.service");
const metadata_roles_1 = require("../enum/metadata_roles");
let AdminRoleGuard = class AdminRoleGuard {
    constructor(reflector, roleService) {
        this.reflector = reflector;
        this.roleService = roleService;
    }
    async canActivate(context) {
        const validRole = this.reflector.get(metadata_roles_1.META_ROLES, context.getHandler());
        return await this.roleService.rolesValidator({
            validRole,
            context,
        });
    }
};
AdminRoleGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Reflector,
        role_service_1.RoleService])
], AdminRoleGuard);
exports.AdminRoleGuard = AdminRoleGuard;
//# sourceMappingURL=admin-role.guard.js.map