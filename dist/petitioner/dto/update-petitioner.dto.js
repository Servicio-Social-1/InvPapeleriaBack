"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePetitionerDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_petitioner_dto_1 = require("./create-petitioner.dto");
class UpdatePetitionerDto extends mapped_types_1.PartialType(create_petitioner_dto_1.CreatePetitionerDto) {
}
exports.UpdatePetitionerDto = UpdatePetitionerDto;
//# sourceMappingURL=update-petitioner.dto.js.map