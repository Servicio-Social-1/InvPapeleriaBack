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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const role_repository_1 = require("../repository/role.repository");
const db_error_handler_service_1 = require("../../shared/services/db-error-handler/db-error-handler.service");
const roles_enum_1 = require("../enum/roles.enum");
let RoleService = class RoleService {
    constructor(roleRepository, dbErrorHandlerService) {
        this.roleRepository = roleRepository;
        this.dbErrorHandlerService = dbErrorHandlerService;
    }
    async create(role) {
        const existingRole = await this.roleRepository.findOneByName(role.name);
        if (existingRole) {
            throw new common_1.ConflictException(`Error: el rol con el nombre ${role.name} ya existe`);
        }
        return this.roleRepository.create(role);
    }
    async findOneByName(name) {
        const role = await this.roleRepository.findOneByName(name);
        if (!role) {
            throw new common_1.NotFoundException(`El role con el nombre ${name} no existe`);
        }
        return role;
    }
    async findOneById(id) {
        const role = await this.roleRepository.findOneById(id);
        if (!role) {
            throw new common_1.NotFoundException(`El role con el id ${id} no existe`);
        }
        return role;
    }
    async update(id, roleDto) {
        const [invalidRole, roleExists, newRoleExists] = await Promise.all([
            this.findOneByName(roles_enum_1.AvailableRoles.USER),
            this.roleRepository.findOneById(id),
            this.roleRepository.findOneByName(roleDto.name),
        ]);
        if (id === invalidRole.id) {
            throw new common_1.BadRequestException(`No puedes editar el rol raíz: ${roles_enum_1.AvailableRoles.USER}`);
        }
        if (newRoleExists &&
            roleExists &&
            newRoleExists.name !== roleExists?.name) {
            throw new common_1.ConflictException(`El role ${roleDto.name} ya existe`);
        }
        try {
            return this.roleRepository.update(id, roleDto);
        }
        catch (error) {
            this.dbErrorHandlerService.handleError(error);
        }
    }
    async findAll() {
        return this.roleRepository.findAll();
    }
    async rolesValidator({ context, validRole, }) {
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        console.log('rolesValidator - Usuario recibido:', user);
        console.log('rolesValidator - Roles válidos:', validRole);
        if (!user) {
            throw new common_1.BadRequestException('Usuario no encontrado');
        }
        let roleName;
        if (user.role && user.role.name) {
            roleName = user.role.name;
        }
        else if (user.roleId) {
            const role = await this.findOneById(user.roleId);
            roleName = role?.name;
        }
        console.log('rolesValidator - Rol del usuario:', roleName);
        const validRolesArray = Array.isArray(validRole) ? validRole : [validRole];
        if (roleName && validRolesArray.includes(roleName)) {
            return true;
        }
        throw new common_1.ForbiddenException(`El usuario ${user.email} no está autorizado`);
    }
};
RoleService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [role_repository_1.RoleRepository,
        db_error_handler_service_1.DbErrorHandlerService])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map