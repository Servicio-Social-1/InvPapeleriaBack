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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfGeneratorController = void 0;
const common_1 = require("@nestjs/common");
const pdf_generator_service_1 = require("./pdf-generator.service");
const create_pdf_generator_dto_1 = require("./dto/create-pdf-generator.dto");
const passport_1 = require("@nestjs/passport");
let PdfGeneratorController = class PdfGeneratorController {
    constructor(pdfGeneratorService) {
        this.pdfGeneratorService = pdfGeneratorService;
    }
    async getPDF(createPdfGeneratorDto, res) {
        const buffer = await this.pdfGeneratorService.generatePdf(createPdfGeneratorDto);
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=${new Date().toString().split(' (')[0]}.pdf`,
            'Content-Length': buffer.length,
        });
        res.end(buffer);
    }
};
__decorate([
    common_1.Get(),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Query()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pdf_generator_dto_1.CreatePdfGeneratorDto, Object]),
    __metadata("design:returntype", Promise)
], PdfGeneratorController.prototype, "getPDF", null);
PdfGeneratorController = __decorate([
    common_1.Controller('pdf-generator'),
    __metadata("design:paramtypes", [pdf_generator_service_1.PdfGeneratorService])
], PdfGeneratorController);
exports.PdfGeneratorController = PdfGeneratorController;
//# sourceMappingURL=pdf-generator.controller.js.map