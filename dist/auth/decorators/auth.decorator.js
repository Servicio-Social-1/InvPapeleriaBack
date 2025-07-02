"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const role_protected_decorator_1 = require("./role-protected.decorator");
const passport_1 = require("@nestjs/passport");
function Auth(guard, roles) {
    return common_1.applyDecorators(role_protected_decorator_1.RoleProtected(roles), common_1.UseGuards(passport_1.AuthGuard(), guard));
}
exports.Auth = Auth;
//# sourceMappingURL=auth.decorator.js.map