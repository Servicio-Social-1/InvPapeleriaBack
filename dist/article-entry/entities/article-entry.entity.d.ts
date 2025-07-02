import { ArticleEntryDetail } from './article-entry-details';
import { User } from '../../auth/entities/user.entity';
export declare class ArticleEntry {
    id: number;
    date: Date;
    status: boolean;
    articleEntryDetail: ArticleEntryDetail[];
    user: User;
}
