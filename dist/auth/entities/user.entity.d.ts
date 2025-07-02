import { ArticleEntry } from '../../article-entry/entities/article-entry.entity';
import { ArticleExit } from '../../article-exit/entities/article-exit.entity';
import { Role } from './role.entity';
export declare class User {
    id: number;
    email: string;
    name: string;
    password: string;
    status: boolean;
    role: Role;
    articleEntry: ArticleEntry[];
    articleExit: ArticleExit[];
}
