"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePetitionerDto = void 0;
const class_validator_1 = require("class-validator");
class CreatePetitionerDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(1),
    class_validator_1.MaxLength(100),
    __metadata("design:type", String)
], CreatePetitionerDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], CreatePetitionerDto.prototype, "area", void 0);
exports.CreatePetitionerDto = CreatePetitionerDto;
//# sourceMappingURL=create-petitioner.dto.js.map