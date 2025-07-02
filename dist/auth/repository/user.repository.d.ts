import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Role } from '../entities/role.entity';
import { EmailDto } from '../dto/login-user.dto copy';
export declare class UserRepository {
    private readonly repository;
    constructor(repository: Repository<User>);
    create(createUserDto: CreateUserDto, role: Role): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findById(id: number): Promise<User>;
    count(): Promise<number>;
    findOneWithPassword(emailDto: EmailDto): Promise<User>;
    findAll(paginationDto: PaginationDto): Promise<User[]>;
    findAllByRole(role: string, paginationDto: PaginationDto): Promise<User[]>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    updateUserWithRole(id: number, updateUserDto: UpdateUserDto, role: Role): Promise<import("typeorm").UpdateResult>;
    delete(id: number): Promise<import("typeorm").UpdateResult>;
}
