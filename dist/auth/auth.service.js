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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const db_error_handler_service_1 = require("../shared/services/db-error-handler/db-error-handler.service");
const jwt_1 = require("@nestjs/jwt");
const role_service_1 = require("./role/role.service");
const roles_enum_1 = require("./enum/roles.enum");
const bcrypt = require("bcryptjs");
const user_repository_1 = require("./repository/user.repository");
let AuthService = class AuthService {
    constructor(dbErrorHandlerService, jwtService, roleService, userRepository) {
        this.dbErrorHandlerService = dbErrorHandlerService;
        this.jwtService = jwtService;
        this.roleService = roleService;
        this.userRepository = userRepository;
    }
    async register(createUserDto, role = roles_enum_1.AvailableRoles.USER) {
        const { password, ...userData } = createUserDto;
        const dbRole = await this.roleService.findOneByName(role);
        const userExists = await this.userRepository.findByEmail(createUserDto.email);
        if (userExists) {
            throw new common_1.ConflictException(`El usuario con el email: ${createUserDto.email} ya existe`);
        }
        const user = await this.userRepository.create({
            ...userData,
            password: bcrypt.hashSync(password, 10),
        }, dbRole);
        delete user.password;
        return { ...user, role: user.role?.name, token: this.getJwt({ id: user.id, role: user.role?.name }) };
    }
    async login(loginUserDto) {
        const { password, email } = loginUserDto;
        const user = await this.userRepository.findOneWithPassword({ email });
        if (!user) {
            throw new common_1.UnauthorizedException('Credentials are not valid (email)');
        }
        if (!bcrypt.compareSync(password, user.password)) {
            throw new common_1.UnauthorizedException('Credentials are not valid (password)');
        }
        const userWithRole = await this.userRepository.findById(user.id);
        delete user.password;
        return { ...user, role: userWithRole?.role?.name, token: this.getJwt({ id: user.id, role: userWithRole?.role?.name }) };
    }
    checkAuthStatus(user) {
        return {
            ...user,
            role: user.role?.name,
            token: this.getJwt({ id: user.id, role: user.role?.name }),
        };
    }
    hasSession(token) {
        try {
            this.jwtService.verify(token.token);
            return true;
        }
        catch (er) {
            return false;
        }
    }
    getJwt(payload) {
        const token = this.jwtService.sign(payload);
        return token;
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [db_error_handler_service_1.DbErrorHandlerService,
        jwt_1.JwtService,
        role_service_1.RoleService,
        user_repository_1.UserRepository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map