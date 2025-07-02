"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleProtected = void 0;
const common_1 = require("@nestjs/common");
const metadata_roles_1 = require("../enum/metadata_roles");
const RoleProtected = (roles) => {
    return common_1.SetMetadata(metadata_roles_1.META_ROLES, Array.isArray(roles) ? roles : [roles]);
};
exports.RoleProtected = RoleProtected;
//# sourceMappingURL=role-protected.decorator.js.map