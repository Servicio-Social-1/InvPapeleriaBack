import { Repository } from 'typeorm';
import { Article } from '../../entities/article.entity';
import { CreateArticleDto } from '../../dto/create-article.dto';
import { PaginationDto } from '../../../shared/dto/pagination.dto';
import { UpdateArticleDto } from '../../dto/update-article.dto';
export declare class ArticlesRepository {
    private readonly repository;
    constructor(repository: Repository<Article>);
    create(createArticleDto: CreateArticleDto): Promise<Article>;
    findById(id: number): Promise<Article>;
    findByIdAnyStatus(id: number): Promise<Article>;
    findByDescription(descriptionLike: string, paginationDto: PaginationDto): Promise<Article[]>;
    findAllPaginated(paginationDto: PaginationDto): Promise<Article[]>;
    findAll(): Promise<Article[]>;
    count(): Promise<number>;
    update(id: number, updateArticleDto: UpdateArticleDto): Promise<import("typeorm").UpdateResult>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
