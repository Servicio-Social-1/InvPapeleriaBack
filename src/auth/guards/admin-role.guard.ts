import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleService } from '../role/role.service';
import { META_ROLES } from '../enum/metadata_roles';

@Injectable()
export class AdminRoleGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly roleService: RoleService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const validRole = this.reflector.get(META_ROLES, context.getHandler());

        return await this.roleService.rolesValidator({
            validRole,
            context,
        });
    }
}
