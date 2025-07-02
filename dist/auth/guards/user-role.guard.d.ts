import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleService } from '../role/role.service';
export declare class UserRoleGuard implements CanActivate {
    private readonly reflector;
    private readonly roleService;
    private readonly logger;
    constructor(reflector: Reflector, roleService: RoleService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
