import { Article } from '../../articles/entities/article.entity';
import { ArticleExit } from './article-exit.entity';
export declare class ArticleExitDetail {
    id: number;
    amount: number;
    article: Article;
    articleExit: ArticleExit;
}
