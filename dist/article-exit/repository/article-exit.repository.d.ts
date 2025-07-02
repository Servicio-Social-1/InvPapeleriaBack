import { Repository } from 'typeorm';
import { ArticleExit } from '../entities/article-exit.entity';
import { Petitioner } from '../../petitioner/entities/petitioner.entity';
import { Area } from '../../area/entities/area.entity';
import { User } from '../../auth/entities/user.entity';
import { PaginationDto } from '../../shared/dto/pagination.dto';
export declare class ArticleExitRepository {
    private readonly repository;
    constructor(repository: Repository<ArticleExit>);
    createArticleExit({ petitioner, area, user, }: {
        petitioner: Petitioner;
        area: Area;
        user: User;
    }): Promise<ArticleExit>;
    findAll(paginationDto: PaginationDto): Promise<ArticleExit[]>;
    findOneById(id: number): Promise<ArticleExit>;
    findById(id: number): Promise<ArticleExit[]>;
    count(): Promise<number>;
    findByTerm(term: string, paginationDto: PaginationDto): Promise<ArticleExit[]>;
    delete(id: number): Promise<import("typeorm").UpdateResult>;
}
