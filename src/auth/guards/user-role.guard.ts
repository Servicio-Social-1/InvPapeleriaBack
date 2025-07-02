import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleService } from '../role/role.service';
import { META_ROLES } from '../enum/metadata_roles';

@Injectable()
export class UserRoleGuard implements CanActivate {
    private readonly logger = new Logger(UserRoleGuard.name);
    constructor(
        private readonly reflector: Reflector,
        private readonly roleService: RoleService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const validRole = this.reflector.get(META_ROLES, context.getHandler());
        const req = context.switchToHttp().getRequest();
        this.logger.debug(`Roles permitidos para la ruta: ${JSON.stringify(validRole)}`);
        this.logger.debug(`Usuario en request: ${JSON.stringify(req.user)}`);
        return await this.roleService.rolesValidator({
            validRole,
            context,
        });
    }
}
