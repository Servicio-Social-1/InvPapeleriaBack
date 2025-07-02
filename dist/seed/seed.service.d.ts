import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UserService } from '../auth/user/user.service';
import { RoleService } from '../auth/role/role.service';
export declare class SeedService {
    private readonly authService;
    private readonly userService;
    private readonly roleService;
    constructor(authService: AuthService, userService: UserService, roleService: RoleService);
    createAdmin(createUserDto: CreateUserDto): Promise<{
        newAdmin: CreateUserDto;
        adminData: {
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
    }>;
}
