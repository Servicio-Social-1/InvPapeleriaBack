"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const user_repository_1 = require("./repository/user.repository");
const shared_module_1 = require("../shared/shared.module");
const role_repository_1 = require("./repository/role.repository");
const role_entity_1 = require("./entities/role.entity");
const user_controller_1 = require("./user/user.controller");
const role_controller_1 = require("./role/role.controller");
const user_service_1 = require("./user/user.service");
const role_service_1 = require("./role/role.service");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const jwt_strategy_1 = require("./strategies/jwt-strategy");
const user_role_guard_1 = require("./guards/user-role.guard");
const admin_role_guard_1 = require("./guards/admin-role.guard");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, role_entity_1.Role]),
            shared_module_1.SharedModule,
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    return {
                        secret: configService.get('JWT_SECRET'),
                        signOptions: {
                            expiresIn: configService.get('JWT_EXPIRES'),
                        },
                    };
                },
            }),
        ],
        controllers: [auth_controller_1.AuthController, role_controller_1.RoleController, user_controller_1.UserController],
        providers: [
            auth_service_1.AuthService,
            user_service_1.UserService,
            role_service_1.RoleService,
            user_repository_1.UserRepository,
            role_repository_1.RoleRepository,
            jwt_strategy_1.JwtStrategy,
            user_role_guard_1.UserRoleGuard,
            admin_role_guard_1.AdminRoleGuard,
        ],
        exports: [
            typeorm_1.TypeOrmModule,
            user_service_1.UserService,
            jwt_strategy_1.JwtStrategy,
            user_role_guard_1.UserRoleGuard,
            admin_role_guard_1.AdminRoleGuard,
            passport_1.PassportModule,
            role_service_1.RoleService,
            auth_service_1.AuthService,
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map