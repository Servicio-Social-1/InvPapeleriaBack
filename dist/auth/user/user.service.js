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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../repository/user.repository");
const role_service_1 = require("../role/role.service");
const db_error_handler_service_1 = require("../../shared/services/db-error-handler/db-error-handler.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
let UserService = class UserService {
    constructor(userRepository, roleService, jwtService, dbErrorHandlerService) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.jwtService = jwtService;
        this.dbErrorHandlerService = dbErrorHandlerService;
    }
    async findAll(paginationDto) {
        const articles = await this.userRepository.findAll(paginationDto);
        if (articles.length === 0) {
            throw new common_1.NotFoundException('Aún no existen usuarios');
        }
        return articles;
    }
    async findAllByRole(role, paginationDto) {
        await this.roleService.findOneByName(role);
        const users = await this.userRepository.findAllByRole(role, paginationDto);
        if (users.length === 0) {
            throw new common_1.BadRequestException('Aún no existen usuarios');
        }
        return users;
    }
    async findOne(term) {
        let user;
        if (!isNaN(+term)) {
            user = await this.findById(+term);
        }
        else {
            user = await this.userRepository.findByEmail(term);
        }
        if (!user) {
            throw new common_1.NotFoundException(`No se encontró el usuario con el id o email: ${term}`);
        }
        return user;
    }
    async count() {
        return this.userRepository.count();
    }
    async findById(id) {
        const user = await this.userRepository.findById(id);
        if (!user || !user.status) {
            throw new common_1.NotFoundException(`No se encontró el usuario con el id: ${id}`);
        }
        return user;
    }
    async update(id, updateUserDto) {
        const user = await this.findById(id);
        try {
            const { email, password, name } = updateUserDto;
            console.log(name);
            const updateData = password
                ? {
                    email,
                    name,
                    password: bcrypt.hashSync(updateUserDto.password, 10),
                }
                : { email, name };
            await this.userRepository.update(id, {
                ...updateData,
            });
            return {
                message: `Usuario ${updateUserDto.email} actualizado correctamente.`,
            };
        }
        catch (error) {
            this.dbErrorHandlerService.handleError(error, `El usuario con el email ${updateUserDto.email} ya existe`);
        }
    }
    async updateUserWithRole(id, updateUserWithRoleDto) {
        const user = await this.findById(id);
        const role = await this.roleService.findOneByName(updateUserWithRoleDto.role);
        try {
            await this.userRepository.updateUserWithRole(id, updateUserWithRoleDto, role);
            return {
                message: `Usuario ${updateUserWithRoleDto.email} actualizado correctamente.`,
            };
        }
        catch (error) {
            this.dbErrorHandlerService.handleError(error, `El usuario con el email ${updateUserWithRoleDto.email} ya existe`);
        }
    }
    async remove(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new common_1.NotFoundException(`No se encontró el articulo con el id: ${id}`);
        }
        if (!user.status) {
            throw new common_1.BadRequestException(`El artículo con el email: ${user.email} ya se encuentra eliminado`);
        }
        const { affected } = await this.userRepository.delete(id);
        if (affected === 1) {
            return {
                message: `Artículo ${user.email} eliminado correctamente.`,
            };
        }
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        role_service_1.RoleService,
        jwt_1.JwtService,
        db_error_handler_service_1.DbErrorHandlerService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map