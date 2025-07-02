import { applyDecorators, UseGuards } from '@nestjs/common';
import { RoleProtected } from './role-protected.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AvailableRoles } from '../enum/roles.enum';

export function Auth(guard: any, roles: AvailableRoles | AvailableRoles[]) {
    return applyDecorators(
        // establece los roles validos para este endpoint
        RoleProtected(roles),
        UseGuards(
            // valida email y pass y añade user al req
            AuthGuard(),
            // Valida los roles del usuario con los roles establecidos previamente
            guard,
        ),
    );
}
