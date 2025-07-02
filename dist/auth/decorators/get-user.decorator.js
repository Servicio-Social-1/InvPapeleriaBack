"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = void 0;
const common_1 = require("@nestjs/common");
exports.GetUser = common_1.createParamDecorator((data, context) => {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user) {
        throw new common_1.InternalServerErrorException('User not found in request');
    }
    if (!data) {
        return user;
    }
    if (typeof data === 'string') {
        return user[data];
    }
    const userWithFilteredProps = {};
    for (const userProp of data) {
        if (!user[userProp]) {
            throw new common_1.InternalServerErrorException('Attribute not found in request');
        }
        userWithFilteredProps[userProp] = user[userProp];
    }
    return userWithFilteredProps;
});
//# sourceMappingURL=get-user.decorator.js.map