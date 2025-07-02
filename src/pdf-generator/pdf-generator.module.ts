import { Module } from '@nestjs/common';
import { PdfGeneratorService } from './pdf-generator.service';
import { PdfGeneratorController } from './pdf-generator.controller';
import { AuthModule } from '../auth/auth.module';
import { ArticlesModule } from '../articles/articles.module';
import { ArticleExitModule } from '../article-exit/article-exit.module';

@Module({
    imports: [AuthModule, ArticlesModule, ArticleExitModule],
    controllers: [PdfGeneratorController],
    providers: [PdfGeneratorService],
})
export class PdfGeneratorModule { }
