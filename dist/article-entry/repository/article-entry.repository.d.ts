import { ArticleEntry } from '../entities/article-entry.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { User } from '../../auth/entities/user.entity';
export declare class ArticleEntryRepository {
    private readonly repository;
    constructor(repository: Repository<ArticleEntry>);
    createArticleEntry(user: User): Promise<ArticleEntry>;
    findAll(paginationDto: PaginationDto): Promise<ArticleEntry[]>;
    count(): Promise<number>;
    findOneById(id: number): Promise<ArticleEntry>;
    findById(id: number): Promise<ArticleEntry[]>;
    findByArticleName(name: string, paginationDto: PaginationDto): Promise<ArticleEntry[]>;
    delete(id: number): Promise<import("typeorm").UpdateResult>;
}
