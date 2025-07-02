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
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const roles_enum_1 = require("../auth/enum/roles.enum");
const auth_service_1 = require("../auth/auth.service");
const user_service_1 = require("../auth/user/user.service");
const role_service_1 = require("../auth/role/role.service");
let SeedService = class SeedService {
    constructor(authService, userService, roleService) {
        this.authService = authService;
        this.userService = userService;
        this.roleService = roleService;
    }
    async createAdmin(createUserDto) {
        const { email, password, name } = createUserDto;
        try {
            const usersExists = await this.userService.findAll({
                limit: 1,
                offset: 0,
            });
            if (usersExists.length) {
                throw new common_1.BadRequestException('Ya existe el primer admin');
            }
        }
        catch (error) {
            if (error?.response?.statusCode === 404) {
                await this.roleService.create({
                    name: roles_enum_1.AvailableRoles.ADMIN,
                });
                const newAdmin = {
                    email,
                    name,
                    password,
                };
                return {
                    newAdmin,
                    adminData: await this.authService.register(newAdmin, roles_enum_1.AvailableRoles.ADMIN),
                };
            }
            if (error?.response?.statusCode === 400) {
                throw new common_1.BadRequestException('Ya existe el primer admin');
            }
        }
    }
};
SeedService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService,
        role_service_1.RoleService])
], SeedService);
exports.SeedService = SeedService;
//# sourceMappingURL=seed.service.js.map