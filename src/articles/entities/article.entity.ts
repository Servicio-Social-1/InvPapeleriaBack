import { ArticleEntryDetail } from '../../article-entry/entities/article-entry-details';
import { ArticleExitDetail } from '../../article-exit/entities/article-exit-details.entity';
import {
    BeforeInsert,
    BeforeUpdate,
    Check,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('articles')
@Check('"stock" >= 0')
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 100,
        unique: true,
    })
    description: string;

    @Column({
        type: 'int',
        default: 0,
    })
    stock: number;

    @Column({
        type: 'varchar',
        length: 100,
    })
    size: string;

    @Column({
        type: 'bool',
        default: true,
    })
    status: boolean;

    @OneToMany(
        () => ArticleEntryDetail,
        (articleEntryDetail: ArticleEntryDetail) => articleEntryDetail.article,
        { cascade: true },
    )
    articleEntryDetail: ArticleEntryDetail[];

    @OneToMany(
        () => ArticleExitDetail,
        (articleExitDetail: ArticleExitDetail) => articleExitDetail.article,
        { cascade: true },
    )
    articleExitDetail: ArticleExitDetail[];

    @BeforeInsert()
    checkSlugInsert() {
        this.description = this.description.trim();
        this.size = this.size.trim();
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.description = this.description.trim();
        this.size = this.size.trim();
    }
}
