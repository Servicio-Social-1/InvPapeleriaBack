import { PdfGeneratorService } from './pdf-generator.service';
import { CreatePdfGeneratorDto } from './dto/create-pdf-generator.dto';
import { Response } from 'express';
export declare class PdfGeneratorController {
    private readonly pdfGeneratorService;
    constructor(pdfGeneratorService: PdfGeneratorService);
    getPDF(createPdfGeneratorDto: CreatePdfGeneratorDto, res: Response): Promise<void>;
}
