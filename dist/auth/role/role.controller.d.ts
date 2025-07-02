import { RoleService } from './role.service';
import { RoleDto } from '../dto/role.dto';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    create(roleDto: RoleDto): Promise<import("../entities/role.entity").Role>;
    findAll(): Promise<import("../entities/role.entity").Role[]>;
    update(id: number, roleDto: RoleDto): Promise<import("typeorm").UpdateResult>;
}
