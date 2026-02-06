import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../shared/dto/pagination.dto';
import { UserService } from './user/user.service';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { LoginUserDto } from './dto/login-user.dto copy';
import { User } from './entities/user.entity';
import { TokenDto } from './dto/token.tdo';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    register(createUserDto: CreateUserDto): Promise<{
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
    checkUserStatus(user: User): {
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
    checkAdminStatus(user: User): {
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
    hasSession(tokenDto: TokenDto): boolean;
    findAll(paginationDto: PaginationDto): Promise<User[]>;
    findOne(term: string & number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<Error | import("../shared/interfaces/success-response").SuccessfullyResponse>;
    updateUserWithRole(id: number, updateUserWithRoleDto: UpdateUserRoleDto): Promise<Error | import("../shared/interfaces/success-response").SuccessfullyResponse>;
    remove(id: number): Promise<Error | import("../shared/interfaces/success-response").SuccessfullyResponse>;
}
