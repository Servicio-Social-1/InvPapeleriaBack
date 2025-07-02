import { Petitioner } from '../../petitioner/entities/petitioner.entity';
import { ArticleExit } from '../../article-exit/entities/article-exit.entity';
export declare class Area {
    id: number;
    name: string;
    status: boolean;
    petitioner: Petitioner[];
    articleExit: ArticleExit[];
    checkSlugInsert(): void;
    checkSlugUpdate(): void;
}
