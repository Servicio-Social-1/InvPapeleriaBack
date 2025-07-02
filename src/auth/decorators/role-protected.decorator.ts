import { SetMetadata } from '@nestjs/common';
import { META_ROLES } from '../enum/metadata_roles';
import { AvailableRoles } from '../enum/roles.enum';

export const RoleProtected = (roles: AvailableRoles | AvailableRoles[]) => {
    return SetMetadata(META_ROLES, Array.isArray(roles) ? roles : [roles]);
};
