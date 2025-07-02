import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ArticleEntryDetail } from './article-entry-details';
import { User } from '../../auth/entities/user.entity';

@Entity('article_entries')
export class ArticleEntry {
    @PrimaryGeneratedColumn()
    id: number;

    // @Column({
    //     type: 'date',
    //     default: () => 'CURRENT_TIMESTAMP',
    // })
    @CreateDateColumn()
    date: Date;


    @Column({
        type: 'bool',
        default: true,
    })
    status: boolean;

    @OneToMany(
        () => ArticleEntryDetail,
        (articleEntryDetail: ArticleEntryDetail) =>
            articleEntryDetail.articleEntry,
        { cascade: true },
    )
    articleEntryDetail: ArticleEntryDetail[];

    @ManyToOne(() => User, (user: User) => user.articleEntry, {
        cascade: true,
        eager: true,
    })
    user: User;
}
