import { ArticleEntryDetail } from '../entities/article-entry-details';
import { Repository } from 'typeorm';
import { Article } from '../../articles/entities/article.entity';
import { ArticleEntry } from '../entities/article-entry.entity';
export declare class ArticleEntryDetailsRepository {
    private readonly repository;
    constructor(repository: Repository<ArticleEntryDetail>);
    create({ article, articleEntry, amount, }: {
        article: Article;
        articleEntry: ArticleEntry;
        amount: number;
    }): Promise<ArticleEntryDetail>;
    saveEntityInstance(articleEntryDetail: ArticleEntryDetail): Promise<ArticleEntryDetail>;
    createEntityInstance({ article, articleEntry, amount, }: {
        article: Article;
        articleEntry: ArticleEntry;
        amount: number;
    }): ArticleEntryDetail;
    deleteAllById(idArticleEntry: number): Promise<import("typeorm").DeleteResult>;
    saveMany(articleEntryDetails: ArticleEntryDetail[]): Promise<ArticleEntryDetail[]>;
}
