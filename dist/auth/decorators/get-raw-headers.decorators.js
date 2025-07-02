"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawHeaders = void 0;
const common_1 = require("@nestjs/common");
exports.RawHeaders = common_1.createParamDecorator((data, context) => {
    const req = context.switchToHttp().getRequest();
    const rawHeaders = req.rawHeaders;
    return rawHeaders;
});
//# sourceMappingURL=get-raw-headers.decorators.js.map