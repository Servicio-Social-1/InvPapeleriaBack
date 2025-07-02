import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntryDetail } from '../entities/article-entry-details';
import { Repository } from 'typeorm';
import { Article } from '../../articles/entities/article.entity';
import { ArticleEntry } from '../entities/article-entry.entity';

@Injectable()
export class ArticleEntryDetailsRepository {
    constructor(
        @InjectRepository(ArticleEntryDetail)
        private readonly repository: Repository<ArticleEntryDetail>,
    ) { }

    async create({
        article,
        articleEntry,
        amount,
    }: {
        article: Article;
        articleEntry: ArticleEntry;
        amount: number;
    }) {
        const articleEntryDetail = this.createEntityInstance({
            article,
            articleEntry,
            amount,
        });
        return await this.saveEntityInstance(articleEntryDetail);
    }

    async saveEntityInstance(articleEntryDetail: ArticleEntryDetail) {
        return await this.repository.save(articleEntryDetail);
    }

    createEntityInstance({
        article,
        articleEntry,
        amount,
    }: {
        article: Article;
        articleEntry: ArticleEntry;
        amount: number;
    }) {
        return this.repository.create({
            article,
            articleEntry,
            amount,
        });
    }

    async deleteAllById(idArticleEntry: number) {
        return await this.repository
            .createQueryBuilder()
            .delete()
            .from(ArticleEntryDetail)
            .where('articleEntryId = :idArticleEntry', { idArticleEntry })
            .execute();
    }

    async saveMany(articleEntryDetails: ArticleEntryDetail[]) {
        return this.repository.save(articleEntryDetails);
    }
}
