import { Controller, Get, Res, Query, UseGuards } from '@nestjs/common';
import { PdfGeneratorService } from './pdf-generator.service';
import { CreatePdfGeneratorDto } from './dto/create-pdf-generator.dto';
import { Response } from 'express';
import { AdminRoleGuard } from '../auth/guards/admin-role.guard';
import { AvailableRoles } from '../auth/enum/roles.enum';
import { Auth } from 'src/auth/decorators';
import { AuthGuard } from '@nestjs/passport';

@Controller('pdf-generator')
export class PdfGeneratorController {
    constructor(private readonly pdfGeneratorService: PdfGeneratorService) { }

    @Get()
    @UseGuards(AuthGuard())
    async getPDF(
        @Query() createPdfGeneratorDto: CreatePdfGeneratorDto,
        @Res() res: Response,
    ): Promise<void> {
        const buffer = await this.pdfGeneratorService.generatePdf(
            createPdfGeneratorDto,
        );

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=${new Date().toString().split(' (')[0]
                }.pdf`,
            'Content-Length': buffer.length,
        });

        res.end(buffer);
    }
}
