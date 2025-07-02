import { UserRepository } from '../repository/user.repository';
import { RoleService } from '../role/role.service';
import { DbErrorHandlerService } from '../../shared/services/db-error-handler/db-error-handler.service';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { SuccessfullyResponse } from '../../shared/interfaces/success-response';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { UpdateUserRoleDto } from '../dto/update-user-role.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private readonly userRepository;
    private readonly roleService;
    private readonly jwtService;
    private readonly dbErrorHandlerService;
    constructor(userRepository: UserRepository, roleService: RoleService, jwtService: JwtService, dbErrorHandlerService: DbErrorHandlerService);
    findAll(paginationDto: PaginationDto): Promise<User[]>;
    findAllByRole(role: string, paginationDto: PaginationDto): Promise<User[]>;
    findOne(term: string & number): Promise<User>;
    count(): Promise<number>;
    findById(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<Error | SuccessfullyResponse>;
    updateUserWithRole(id: number, updateUserWithRoleDto: UpdateUserRoleDto): Promise<Error | SuccessfullyResponse>;
    remove(id: number): Promise<Error | SuccessfullyResponse>;
}
