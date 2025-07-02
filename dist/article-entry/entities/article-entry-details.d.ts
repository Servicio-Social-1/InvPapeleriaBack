import { Article } from '../../articles/entities/article.entity';
import { ArticleEntry } from './article-entry.entity';
export declare class ArticleEntryDetail {
    id: number;
    amount: number;
    article: Article;
    articleEntry: ArticleEntry;
}
