import { ArticleEntryDetail } from '../../article-entry/entities/article-entry-details';
import { ArticleExitDetail } from '../../article-exit/entities/article-exit-details.entity';
export declare class Article {
    id: number;
    description: string;
    stock: number;
    size: string;
    status: boolean;
    articleEntryDetail: ArticleEntryDetail[];
    articleExitDetail: ArticleExitDetail[];
    checkSlugInsert(): void;
    checkSlugUpdate(): void;
}
