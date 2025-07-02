import { CreateUserDto } from './dto/create-user.dto';
import { DbErrorHandlerService } from '../shared/services/db-error-handler/db-error-handler.service';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from './role/role.service';
import { AvailableRoles } from './enum/roles.enum';
import { UserRepository } from './repository/user.repository';
import { LoginUserDto } from './dto/login-user.dto copy';
import { TokenDto } from './dto/token.tdo';
export declare class AuthService {
    private readonly dbErrorHandlerService;
    private readonly jwtService;
    private readonly roleService;
    private readonly userRepository;
    constructor(dbErrorHandlerService: DbErrorHandlerService, jwtService: JwtService, roleService: RoleService, userRepository: UserRepository);
    register(createUserDto: CreateUserDto, role?: AvailableRoles): Promise<{
        role: string;
        token: string;
        id: number;
        email: string;
        name: string;
        password: string;
        status: boolean;
        articleEntry: import("../article-entry/entities/article-entry.entity").ArticleEntry[];
        articleExit: import("../article-exit/entities/article-exit.entity").ArticleExit[];
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        role: string;
        token: string;
        id: number;
        email: string;
        name: string;
        password: string;
        status: boolean;
        articleEntry: import("../article-entry/entities/article-entry.entity").ArticleEntry[];
        articleExit: import("../article-exit/entities/article-exit.entity").ArticleExit[];
    }>;
    checkAuthStatus(user: User): {
        role: string;
        token: string;
        id: number;
        email: string;
        name: string;
        password: string;
        status: boolean;
        articleEntry: import("../article-entry/entities/article-entry.entity").ArticleEntry[];
        articleExit: import("../article-exit/entities/article-exit.entity").ArticleExit[];
    };
    hasSession(token: TokenDto): boolean;
    private getJwt;
}
