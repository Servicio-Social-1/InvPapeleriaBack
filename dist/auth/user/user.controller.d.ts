import { PaginationDto } from '../../shared/dto/pagination.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from '../dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(paginationDto: PaginationDto): Promise<import("../entities/user.entity").User[]>;
    findById(id: number): Promise<import("../entities/user.entity").User>;
    count(): Promise<number>;
    findAllByRole(role: string, paginationDto: PaginationDto): Promise<import("../entities/user.entity").User[]>;
    update(id: number, updateArticleDto: UpdateUserDto): Promise<Error | import("../../shared/interfaces/success-response").SuccessfullyResponse>;
    remove(id: number): Promise<Error | import("../../shared/interfaces/success-response").SuccessfullyResponse>;
}
