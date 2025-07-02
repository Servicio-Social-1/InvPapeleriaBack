import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { CreateArticleEntryDto } from './dto/create-article/create-article-entry.dto';
import { ArticleEntryRepository } from './repository/article-entry.repository';
import { ArticleEntryDetailsRepository } from './repository/article-entry-details.repository';
import { PaginationDto } from '../shared/dto/pagination.dto';
import { UserService } from '../auth/user/user.service';
import { ArticlesService } from '../articles/articles.service';
import { CreateArticleEntryDetailsDto } from './dto/create-article-details/create-article-entry-details.dto';
import { DbErrorHandlerService } from '../shared/services/db-error-handler/db-error-handler.service';
import { SuccessfullyResponse } from '../shared/interfaces/success-response';
import { ArticleEntry } from './entities/article-entry.entity';

@Injectable()
export class ArticleEntryService {
    constructor(
        private readonly articleEntryRepository: ArticleEntryRepository,
        private readonly articleEntryDetailsRepository: ArticleEntryDetailsRepository,
        private readonly dbErrorHandlerService: DbErrorHandlerService,
        private readonly userService: UserService,
        private readonly articleService: ArticlesService,
    ) { }

    async create(createArticleEntryDto: CreateArticleEntryDto) {
        const user = await this.userService.findById(
            createArticleEntryDto.idUser,
        );
        const articleEntry =
            await this.articleEntryRepository.createArticleEntry(user);
        const articleEntryDetails = await this.createArticleEntryDetails(
            createArticleEntryDto,
            articleEntry,
        );
        return articleEntryDetails;
    }

    private async createArticleEntryDetails(
        createArticleEntryDto: CreateArticleEntryDto,
        articleEntry: ArticleEntry,
    ) {
        const articleEntryDetails = await Promise.all(
            createArticleEntryDto.articleEntryDetails.map(
                async (articleDetail: CreateArticleEntryDetailsDto) =>
                    this.articleEntryDetailsRepository.createEntityInstance({
                        amount: articleDetail.amount,
                        articleEntry,
                        article: await this.articleService.findById(
                            articleDetail.idArticle,
                        ),
                    }),
            ),
        );
        return await this.articleEntryDetailsRepository.saveMany(
            articleEntryDetails,
        );
    }

    async findAll(paginationDto: PaginationDto) {
        return this.articleEntryRepository.findAll(paginationDto);
    }

    async count() {
        return await this.articleEntryRepository.count();
    }

    async findByName(name: string, paginationDto: PaginationDto) {
        return await this.articleEntryRepository.findByArticleName(
            name,
            paginationDto,
        );
    }

    async findOneById(id: number) {
        const articleEntry = await this.articleEntryRepository.findOneById(id);
        if (!articleEntry || !articleEntry.status) {
            throw new NotFoundException(
                `No se encontró la entrada de artículo con el id: ${id}`,
            );
        }
        return articleEntry;
    }

    async findById(id: number) {
        const articleEntries = await this.articleEntryRepository.findById(id);
        if (!articleEntries.length || !articleEntries[0].status) {
            throw new NotFoundException(
                `No se encontró la entrada de artículo con el id: ${id}`,
            );
        }
        return articleEntries[0];
    }

    async update(id: number, createArticleEntryDto: CreateArticleEntryDto) {
        if (!createArticleEntryDto.articleEntryDetails.length) {
            throw new BadRequestException(
                'No has agregado detalles para actualizar',
            );
        }
        const articleEntry = await this.findById(id);
        await this.articleEntryDetailsRepository.deleteAllById(id);
        const articleEntryDetails = await this.createArticleEntryDetails(
            createArticleEntryDto,
            articleEntry,
        );
        return articleEntryDetails;
    }

    async remove(id: number): Promise<Error | SuccessfullyResponse> {
        const articleEntry = await this.findById(id);
        if (!articleEntry) {
            throw new NotFoundException(
                `No se encontró la entrada del artículo con el id: ${id}`,
            );
        }
        if (!articleEntry.status) {
            throw new BadRequestException(
                `El artículo con el id: ${articleEntry.id} ya se encuentra eliminado`,
            );
        }
        const { affected } = await this.articleEntryRepository.delete(id);
        if (affected === 1) {
            return {
                message: `Artículo ${articleEntry.id} eliminado correctamente.`,
            };
        }
    }
}
