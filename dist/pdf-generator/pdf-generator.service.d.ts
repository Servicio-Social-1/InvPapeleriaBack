/// <reference types="node" />
import { CreatePdfGeneratorDto } from './dto/create-pdf-generator.dto';
import { ArticlesService } from '../articles/articles.service';
import { ArticleExitService } from '../article-exit/article-exit.service';
export declare class PdfGeneratorService {
    private articlesService;
    private articleExitService;
    constructor(articlesService: ArticlesService, articleExitService: ArticleExitService);
    generatePdf(createPdfGeneratorDto: CreatePdfGeneratorDto): Promise<Buffer>;
    generateInventoryReport(): Promise<Buffer>;
    generateArticleExitReport(createPdfGeneratorDto: CreatePdfGeneratorDto): Promise<Buffer>;
    generateCustomArticleExitReportPDF(createPdfGeneratorDto: CreatePdfGeneratorDto): Promise<Buffer>;
    private createCell;
    private textInRow;
    private header;
    private descriptions;
    private articles;
    private signatures;
}
