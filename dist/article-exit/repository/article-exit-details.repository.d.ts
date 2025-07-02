import { Repository } from 'typeorm';
import { ArticleExitDetail } from '../entities/article-exit-details.entity';
import { Article } from '../../articles/entities/article.entity';
import { ArticleExit } from '../entities/article-exit.entity';
export declare class ArticleExitDetailsRepository {
    private readonly repository;
    constructor(repository: Repository<ArticleExitDetail>);
    create({ article, articleExit, amount, }: {
        article: Article;
        articleExit: ArticleExit;
        amount: number;
    }): Promise<ArticleExitDetail>;
    saveEntityInstance(articleExitDetail: ArticleExitDetail): Promise<ArticleExitDetail>;
    createEntityInstance({ article, articleExit, amount, }: {
        article: Article;
        articleExit: ArticleExit;
        amount: number;
    }): ArticleExitDetail;
    deleteAllById(idArticleExit: number): Promise<import("typeorm").DeleteResult>;
    saveMany(articleExitDetails: ArticleExitDetail[]): Promise<ArticleExitDetail[]>;
}
