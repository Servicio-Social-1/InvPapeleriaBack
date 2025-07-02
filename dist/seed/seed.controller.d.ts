import { SeedService } from './seed.service';
import { CreateUserDto } from '../auth/dto/create-user.dto';
export declare class SeedController {
    private readonly seedService;
    constructor(seedService: SeedService);
    create(createUserDto: CreateUserDto): Promise<{
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
