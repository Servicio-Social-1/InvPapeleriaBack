import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { SharedModule } from '../shared/shared.module';
import { RoleRepository } from './repository/role.repository';
import { Role } from './entities/role.entity';
import { UserController } from './user/user.controller';
import { RoleController } from './role/role.controller';
import { UserService } from './user/user.service';
import { RoleService } from './role/role.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt-strategy';
import { UserRoleGuard } from './guards/user-role.guard';
import { AdminRoleGuard } from './guards/admin-role.guard';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([User, Role]),
        SharedModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: configService.get('JWT_EXPIRES'),
                    },
                };
            },
        }),
    ],
    controllers: [AuthController, RoleController, UserController],
    providers: [
        AuthService,
        UserService,
        RoleService,
        UserRepository,
        RoleRepository,
        JwtStrategy,
        UserRoleGuard,
        AdminRoleGuard,
    ],
    exports: [
        TypeOrmModule,
        UserService,
        JwtStrategy,
        UserRoleGuard,
        AdminRoleGuard,
        PassportModule,
        RoleService,
        AuthService,
    ],
})
export class AuthModule { }
