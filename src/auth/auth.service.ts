import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DbErrorHandlerService } from '../shared/services/db-error-handler/db-error-handler.service';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload-interface';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from './role/role.service';
import { AvailableRoles } from './enum/roles.enum';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from './repository/user.repository';
import { LoginUserDto } from './dto/login-user.dto copy';
import { TokenDto } from './dto/token.tdo';

@Injectable()
export class AuthService {
    constructor(
        private readonly dbErrorHandlerService: DbErrorHandlerService,
        private readonly jwtService: JwtService,
        private readonly roleService: RoleService,
        private readonly userRepository: UserRepository,
    ) { }

    async register(
        createUserDto: CreateUserDto,
        role: AvailableRoles = AvailableRoles.USER,
    ) {
        const { password, ...userData } = createUserDto;

        const dbRole = await this.roleService.findOneByName(role);
        const userExists = await this.userRepository.findByEmail(
            createUserDto.email,
        );
        if (userExists) {
            throw new ConflictException(
                `El usuario con el email: ${createUserDto.email} ya existe`,
            );
        }
        const user = await this.userRepository.create(
            {
                ...userData,
                password: bcrypt.hashSync(password, 10),
            },
            dbRole,
        );
        delete user.password;
        // Incluir el nombre del rol en el JWT y en la respuesta
        return { ...user, role: user.role?.name, token: this.getJwt({ id: user.id, role: user.role?.name }) };
    }

    async login(loginUserDto: LoginUserDto) {
        const { password, email } = loginUserDto;
        const user = await this.userRepository.findOneWithPassword({ email });
        if (!user) {
            throw new UnauthorizedException(
                'Credentials are not valid (email)',
            );
        }
        if (!bcrypt.compareSync(password, user.password)) {
            throw new UnauthorizedException(
                'Credentials are not valid (password)',
            );
        }
        // Obtener el rol del usuario
        const userWithRole = await this.userRepository.findById(user.id);
        delete user.password;
        // Incluir el nombre del rol en el JWT y en la respuesta
        return { ...user, role: userWithRole?.role?.name, token: this.getJwt({ id: user.id, role: userWithRole?.role?.name }) };
    }

    checkAuthStatus(user: User) {
        // Incluir el nombre del rol en la respuesta y en el JWT
        return {
            ...user,
            role: user.role?.name,
            token: this.getJwt({ id: user.id, role: user.role?.name }),
        };
    }

    hasSession(token: TokenDto) {
        try {
            this.jwtService.verify(token.token);
            return true;
        } catch (er) {
            // JsonWebTokenError
            // TokenExpiredError
            return false;
        }
    }

    private getJwt(payload: JwtPayload & { role?: string }) {
        const token = this.jwtService.sign(payload);
        return token;
    }
}
