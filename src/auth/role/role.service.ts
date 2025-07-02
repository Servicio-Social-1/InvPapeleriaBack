import {
    Injectable,
    NotFoundException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
} from '@nestjs/common';
import { RoleRepository } from '../repository/role.repository';
import { DbErrorHandlerService } from '../../shared/services/db-error-handler/db-error-handler.service';
import { RoleDto } from '../dto/role.dto';
import { AvailableRoles } from '../enum/roles.enum';
import { ExecutionContext } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class RoleService {
    constructor(
        private readonly roleRepository: RoleRepository,
        private readonly dbErrorHandlerService: DbErrorHandlerService,
    ) { }

    async create(role: RoleDto) {
        const existingRole = await this.roleRepository.findOneByName(role.name);
        if (existingRole) {
            throw new ConflictException(
                `Error: el rol con el nombre ${role.name} ya existe`,
            );
        }
        return this.roleRepository.create(role);
    }

    async findOneByName(name: string) {
        const role = await this.roleRepository.findOneByName(name);
        if (!role) {
            throw new NotFoundException(
                `El role con el nombre ${name} no existe`,
            );
        }
        return role;
    }

    async findOneById(id: number) {
        const role = await this.roleRepository.findOneById(id);
        if (!role) {
            throw new NotFoundException(
                `El role con el id ${id} no existe`,
            );
        }
        return role;
    }

    async update(id: number, roleDto: RoleDto) {
        const [invalidRole, roleExists, newRoleExists] = await Promise.all([
            this.findOneByName(AvailableRoles.USER),
            this.roleRepository.findOneById(id),
            this.roleRepository.findOneByName(roleDto.name),
        ]);
        if (id === invalidRole.id) {
            throw new BadRequestException(
                `No puedes editar el rol raíz: ${AvailableRoles.USER}`,
            );
        }
        if (
            newRoleExists &&
            roleExists &&
            newRoleExists.name !== roleExists?.name
        ) {
            throw new ConflictException(`El role ${roleDto.name} ya existe`);
        }
        try {
            return this.roleRepository.update(id, roleDto);
        } catch (error) {
            this.dbErrorHandlerService.handleError(error);
        }
    }

    async findAll() {
        return this.roleRepository.findAll();
    }

    async rolesValidator({
        context,
        validRole,
    }: {
        context: ExecutionContext;
        validRole: AvailableRoles | AvailableRoles[];
    }) {
        const req = context.switchToHttp().getRequest();
        const user = req.user as any;
        console.log('rolesValidator - Usuario recibido:', user);
        console.log('rolesValidator - Roles válidos:', validRole);
        if (!user) {
            throw new BadRequestException('Usuario no encontrado');
        }
        let roleName: string | undefined;
        if (user.role && user.role.name) {
            roleName = user.role.name;
        } else if (user.roleId) {
            // Buscar el rol por ID si no viene el objeto role
            const role = await this.findOneById(user.roleId);
            roleName = role?.name;
        }
        console.log('rolesValidator - Rol del usuario:', roleName);
        const validRolesArray = Array.isArray(validRole) ? validRole : [validRole];
        if (roleName && validRolesArray.includes(roleName as AvailableRoles)) {
            return true;
        }
        throw new ForbiddenException(
            `El usuario ${user.email} no está autorizado`,
        );
    }
}
