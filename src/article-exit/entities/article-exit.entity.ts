import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Petitioner } from '../../petitioner/entities/petitioner.entity';
import { User } from '../../auth/entities/user.entity';
import { Area } from '../../area/entities/area.entity';
import { ArticleExitDetail } from './article-exit-details.entity';

@Entity()
export class ArticleExit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", nullable: false})
    date: string;

    @Column({ type: "varchar", nullable: false})
    time: string;

    @Column({
        type: 'bool',
        default: true,
    })
    status: boolean;

    @OneToMany(
        () => ArticleExitDetail,
        (articleExitDetail: ArticleExitDetail) => articleExitDetail.articleExit,
        // { cascade: true, eager: true },
    )
    articleExitDetail: ArticleExitDetail[];

    @ManyToOne(
        () => Petitioner,
        (petitioner: Petitioner) => petitioner.articleExit,
        {
            eager: true,
            cascade: true,
        },
    )
    petitioner: Petitioner;

    @ManyToOne(() => Area, (area: Area) => area.articleExit, {
        eager: true,
        cascade: true,
    })
    area: Area;

    @ManyToOne(() => User, (user: User) => user.articleExit, {
        cascade: true,
        eager: true,
    })
    user: User;
}
