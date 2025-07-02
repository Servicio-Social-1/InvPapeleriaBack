import { Area } from '../../area/entities/area.entity';
import { ArticleExit } from '../../article-exit/entities/article-exit.entity';
export declare class Petitioner {
    id: number;
    name: string;
    area: Area;
    articleExit: ArticleExit[];
    status: boolean;
    checkSlugInsert(): void;
    checkSlugUpdate(): void;
}
