import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PaginationDto } from '../shared/dto/pagination.dto';
export declare class ArticlesController {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
    create(createArticleDto: CreateArticleDto): Promise<import("./entities/article.entity").Article>;
    findAll(paginationDto: PaginationDto): Promise<import("./entities/article.entity").Article[]>;
    count(): Promise<number>;
    findByidOrName(term: string & number, paginationDto: PaginationDto): Promise<any>;
    update(id: number, updateArticleDto: UpdateArticleDto): Promise<import("../shared/interfaces/success-response").SuccessfullyResponse | Error>;
    remove(id: number): Promise<import("../shared/interfaces/success-response").SuccessfullyResponse | Error>;
}
