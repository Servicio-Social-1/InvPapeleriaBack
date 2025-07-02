import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';
import { RoleDto } from '../dto/role.dto';
export declare class RoleRepository {
    private readonly repository;
    constructor(repository: Repository<Role>);
    create(name: RoleDto): Promise<Role>;
    update(id: number, name: RoleDto): Promise<import("typeorm").UpdateResult>;
    findOneByName(name: string): Promise<Role>;
    findOneById(id: number): Promise<Role>;
    findAll(): Promise<Role[]>;
}
