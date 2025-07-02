import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from '../../articles/entities/article.entity';
import { ArticleExit } from './article-exit.entity';

@Entity('article_exits_detail')
export class ArticleExitDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'numeric',
    })
    amount: number;

    @ManyToOne(() => Article, (article: Article) => article.articleExitDetail, {
        eager: true,
        onDelete: 'CASCADE',
    })
    article: Article;

    @ManyToOne(
        () => ArticleExit,
        (articleExit: ArticleExit) => articleExit.articleExitDetail,
        { eager: true },
    )
    articleExit: ArticleExit;
}
