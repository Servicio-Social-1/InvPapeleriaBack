"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbErrorHandlerService = void 0;
const common_1 = require("@nestjs/common");
let DbErrorHandlerService = class DbErrorHandlerService {
    handleError(error, message = '') {
        if (error.code === '23505') {
            throw new common_1.ConflictException(message);
        }
        console.log(error);
        throw new common_1.InternalServerErrorException('Error inesperado, llamar al administrador');
    }
};
DbErrorHandlerService = __decorate([
    common_1.Injectable()
], DbErrorHandlerService);
exports.DbErrorHandlerService = DbErrorHandlerService;
//# sourceMappingURL=db-error-handler.service.js.map