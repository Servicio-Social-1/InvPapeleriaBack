import { ArticleExitService } from './article-exit.service';
import { CreateArticleExitDto } from './dto/create-article-exit/create-article-exit.dto';
import { PaginationDto } from '../shared/dto/pagination.dto';
export declare class ArticleExitController {
    private readonly articleExitService;
    constructor(articleExitService: ArticleExitService);
    create(createArticleExitDto: CreateArticleExitDto): Promise<import("./entities/article-exit.entity").ArticleExit>;
    findAll(paginationDto: PaginationDto): Promise<import("./entities/article-exit.entity").ArticleExit[]>;
    count(): Promise<number>;
    findByArticleName(name: string, paginationDto: PaginationDto): Promise<import("./entities/article-exit.entity").ArticleExit[]>;
    getById(id: number): Promise<import("./entities/article-exit.entity").ArticleExit>;
    update(id: number, createArticleExitDto: CreateArticleExitDto): Promise<import("./entities/article-exit.entity").ArticleExit>;
    remove(id: number): Promise<Error | import("../shared/interfaces/success-response").SuccessfullyResponse>;
}
