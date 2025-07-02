import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from '../../articles/entities/article.entity';
import { ArticleEntry } from './article-entry.entity';

@Entity('article_entries_detail')
export class ArticleEntryDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'numeric',
    })
    amount: number;

    @ManyToOne(() => Article, (article: Article) => article.articleEntryDetail, { onDelete: 'CASCADE' })
    article: Article;

    @ManyToOne(
        () => ArticleEntry,
        (articleEntry: ArticleEntry) => articleEntry.articleEntryDetail,
    )
    articleEntry: ArticleEntry;
}
