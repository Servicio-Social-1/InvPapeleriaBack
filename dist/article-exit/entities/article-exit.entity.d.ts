import { Petitioner } from '../../petitioner/entities/petitioner.entity';
import { User } from '../../auth/entities/user.entity';
import { Area } from '../../area/entities/area.entity';
import { ArticleExitDetail } from './article-exit-details.entity';
export declare class ArticleExit {
    id: number;
    date: string;
    time: string;
    status: boolean;
    articleExitDetail: ArticleExitDetail[];
    petitioner: Petitioner;
    area: Area;
    user: User;
}
