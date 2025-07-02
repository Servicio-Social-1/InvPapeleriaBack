import { CreateArticleEntryDto } from './dto/create-article/create-article-entry.dto';
import { ArticleEntryRepository } from './repository/article-entry.repository';
import { ArticleEntryDetailsRepository } from './repository/article-entry-details.repository';
import { PaginationDto } from '../shared/dto/pagination.dto';
import { UserService } from '../auth/user/user.service';
import { ArticlesService } from '../articles/articles.service';
import { DbErrorHandlerService } from '../shared/services/db-error-handler/db-error-handler.service';
import { SuccessfullyResponse } from '../shared/interfaces/success-response';
import { ArticleEntry } from './entities/article-entry.entity';
export declare class ArticleEntryService {
    private readonly articleEntryRepository;
    private readonly articleEntryDetailsRepository;
    private readonly dbErrorHandlerService;
    private readonly userService;
    private readonly articleService;
    constructor(articleEntryRepository: ArticleEntryRepository, articleEntryDetailsRepository: ArticleEntryDetailsRepository, dbErrorHandlerService: DbErrorHandlerService, userService: UserService, articleService: ArticlesService);
    create(createArticleEntryDto: CreateArticleEntryDto): Promise<import("./entities/article-entry-details").ArticleEntryDetail[]>;
    private createArticleEntryDetails;
    findAll(paginationDto: PaginationDto): Promise<ArticleEntry[]>;
    count(): Promise<number>;
    findByName(name: string, paginationDto: PaginationDto): Promise<ArticleEntry[]>;
    findOneById(id: number): Promise<ArticleEntry>;
    findById(id: number): Promise<ArticleEntry>;
    update(id: number, createArticleEntryDto: CreateArticleEntryDto): Promise<import("./entities/article-entry-details").ArticleEntryDetail[]>;
    remove(id: number): Promise<Error | SuccessfullyResponse>;
}
