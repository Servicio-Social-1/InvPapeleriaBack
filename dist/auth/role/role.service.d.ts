import { RoleRepository } from '../repository/role.repository';
import { DbErrorHandlerService } from '../../shared/services/db-error-handler/db-error-handler.service';
import { RoleDto } from '../dto/role.dto';
import { AvailableRoles } from '../enum/roles.enum';
import { ExecutionContext } from '@nestjs/common';
export declare class RoleService {
    private readonly roleRepository;
    private readonly dbErrorHandlerService;
    constructor(roleRepository: RoleRepository, dbErrorHandlerService: DbErrorHandlerService);
    create(role: RoleDto): Promise<import("../entities/role.entity").Role>;
    findOneByName(name: string): Promise<import("../entities/role.entity").Role>;
    findOneById(id: number): Promise<import("../entities/role.entity").Role>;
    update(id: number, roleDto: RoleDto): Promise<import("typeorm").UpdateResult>;
    findAll(): Promise<import("../entities/role.entity").Role[]>;
    rolesValidator({ context, validRole, }: {
        context: ExecutionContext;
        validRole: AvailableRoles | AvailableRoles[];
    }): Promise<boolean>;
}
