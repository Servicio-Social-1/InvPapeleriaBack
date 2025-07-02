import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleExitDetail } from '../entities/article-exit-details.entity';
import { Article } from '../../articles/entities/article.entity';
import { ArticleExit } from '../entities/article-exit.entity';


export class ArticleExitDetailsRepository {
    constructor(
        @InjectRepository(ArticleExitDetail)
        private readonly repository: Repository<ArticleExitDetail>,
    ) { }

    async create({
        article,
        articleExit,
        amount,
    }: {
        article: Article;
        articleExit: ArticleExit;
        amount: number;
    }) {
        const articleExitDetail = this.createEntityInstance({
            article,
            articleExit,
            amount,
        });
        return await this.saveEntityInstance(articleExitDetail);
    }

    async saveEntityInstance(articleExitDetail: ArticleExitDetail) {
        return await this.repository.save(articleExitDetail);
    }

    createEntityInstance({
        article,
        articleExit,
        amount,
    }: {
        article: Article;
        articleExit: ArticleExit;
        amount: number;
    }) {
        return this.repository.create({
            article,
            articleExit,
            amount,
        });
    }

    async deleteAllById(idArticleExit: number) {
        return await this.repository
            .createQueryBuilder()
            .delete()
            .from(ArticleExitDetail)
            .where('articleExitId = :idArticleExit', { idArticleExit })
            .execute();
    }

    async saveMany(articleExitDetails: ArticleExitDetail[]) {
        return this.repository.save(articleExitDetails);
    }
}
