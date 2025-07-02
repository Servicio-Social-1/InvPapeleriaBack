import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticlesRepository } from './repository/articles/articles.repository';
import { PaginationDto } from '../shared/dto/pagination.dto';
import { Article } from './entities/article.entity';
import { DbErrorHandlerService } from '../shared/services/db-error-handler/db-error-handler.service';
import { SuccessfullyResponse } from '../shared/interfaces/success-response';
export declare class ArticlesService {
    private readonly articlesRepository;
    private readonly dbErrorHandlerService;
    constructor(articlesRepository: ArticlesRepository, dbErrorHandlerService: DbErrorHandlerService);
    create(createArticleDto: CreateArticleDto): Promise<Article>;
    findAllPaginated(paginationDto: PaginationDto): Promise<Article[]>;
    findAll(): Promise<Article[]>;
    findById(id: number): Promise<Article>;
    findByidOrName(term: string & number, paginationDto: PaginationDto): Promise<any>;
    count(): Promise<number>;
    update(id: number, updateArticleDto: UpdateArticleDto): Promise<Error | SuccessfullyResponse>;
    remove(id: number): Promise<Error | SuccessfullyResponse>;
}
