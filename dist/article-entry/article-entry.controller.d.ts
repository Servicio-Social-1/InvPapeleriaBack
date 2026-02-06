import { ArticleEntryService } from './article-entry.service';
import { CreateArticleEntryDto } from './dto/create-article/create-article-entry.dto';
import { PaginationDto } from '../shared/dto/pagination.dto';
export declare class ArticleEntryController {
    private readonly articleEntryService;
    constructor(articleEntryService: ArticleEntryService);
    create(createArticleEntryDto: CreateArticleEntryDto): Promise<import("./entities/article-entry-details").ArticleEntryDetail[]>;
    findAll(paginationDto: PaginationDto): Promise<import("./entities/article-entry.entity").ArticleEntry[]>;
    count(): Promise<number>;
    findByArticleName(name: string, paginationDto: PaginationDto): Promise<import("./entities/article-entry.entity").ArticleEntry[]>;
    getById(id: number): Promise<import("./entities/article-entry.entity").ArticleEntry>;
    update(id: number, createArticleEntryDto: CreateArticleEntryDto): Promise<import("./entities/article-entry-details").ArticleEntryDetail[]>;
    remove(id: number): Promise<Error | import("../shared/interfaces/success-response").SuccessfullyResponse>;
}
