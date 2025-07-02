import { Module } from '@nestjs/common';
import { ArticleEntryService } from './article-entry.service';
import { ArticleEntryController } from './article-entry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntry } from './entities/article-entry.entity';
import { ArticleEntryDetail } from './entities/article-entry-details';
import { ArticleEntryRepository } from './repository/article-entry.repository';
import { ArticleEntryDetailsRepository } from './repository/article-entry-details.repository';
import { AuthModule } from '../auth/auth.module';
import { ArticlesModule } from '../articles/articles.module';
import { SharedModule } from '../shared/shared.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ArticleEntry, ArticleEntryDetail]),
        AuthModule,
        ArticlesModule,
        SharedModule,
        AuthModule
    ],
    controllers: [ArticleEntryController],
    providers: [
        ArticleEntryService,
        ArticleEntryRepository,
        ArticleEntryDetailsRepository,
    ],
    exports: [TypeOrmModule],
})
export class ArticleEntryModule { }
