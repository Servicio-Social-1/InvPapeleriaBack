import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticlesRepository } from './repository/articles/articles.repository';
import { PaginationDto } from '../shared/dto/pagination.dto';
import { Article } from './entities/article.entity';
import { DbErrorHandlerService } from '../shared/services/db-error-handler/db-error-handler.service';
import { SuccessfullyResponse } from '../shared/interfaces/success-response';

@Injectable()
export class ArticlesService {
    constructor(
        private readonly articlesRepository: ArticlesRepository,
        private readonly dbErrorHandlerService: DbErrorHandlerService,
    ) { }

    async create(createArticleDto: CreateArticleDto) {
        try {
            return await this.articlesRepository.create(createArticleDto);
        } catch (error) {
            this.dbErrorHandlerService.handleError(
                error,
                `El artículo con la descripción ${createArticleDto.description} ya existe`,
            );
        }
    }

    async findAllPaginated(paginationDto: PaginationDto) {
        const articles = await this.articlesRepository.findAllPaginated(paginationDto);
        if (articles.length === 0) {
            throw new BadRequestException('Aún no existen artículos');
        }
        return articles;
    }

    async findAll() {
        const articles = await this.articlesRepository.findAll();
        if (articles.length === 0) {
            throw new BadRequestException('Aún no existen artículos');
        }
        return articles;
    }

    async findById(id: number) {
        // Buscar sin importar el status
        const article = await this.articlesRepository.findByIdAnyStatus(id);
        if (!article) {
            throw new NotFoundException(
                `No se encontró el artículo con el id: ${id}`,
            );
        }
        return article;
    }

    async findByidOrName(term: string & number, paginationDto: PaginationDto) {
        let articleOrArticles: any;
        if (!isNaN(+term)) {
            articleOrArticles = await this.findById(+term);
        } else {
            articleOrArticles = await this.articlesRepository.findByDescription(
                term,
                paginationDto,
            );
        }
        if (!articleOrArticles && !articleOrArticles.length) {
            throw new NotFoundException(
                `No se encontró el articulo con el id o descripción: ${term}`,
            );
        }
        return articleOrArticles;
    }

    async count() {
        return await this.articlesRepository.count();
    }

    async update(
        id: number,
        updateArticleDto: UpdateArticleDto,
    ): Promise<Error | SuccessfullyResponse> {
        const article = await this.findById(id);
        try {
            await this.articlesRepository.update(id, updateArticleDto);
            return {
                message: `Artículo ${updateArticleDto.description} actualizado correctamente.`,
            };
        } catch (error) {
            this.dbErrorHandlerService.handleError(
                error,
                `El artículo con la descripción ${updateArticleDto.description} ya existe`,
            );
        }
    }

    async remove(id: number): Promise<Error | SuccessfullyResponse> {
        // Buscar el artículo sin importar el status
        const article = await this.articlesRepository.findByIdAnyStatus(id);
        if (!article) {
            throw new NotFoundException(
                `No se encontró el articulo con el id: ${id}`,
            );
        }
        // Borrado físico
        const result = await this.articlesRepository.delete(id);
        if (result.affected === 1) {
            return {
                message: `Artículo ${article.description} eliminado correctamente.`,
            };
        } else {
            throw new NotFoundException(`No se pudo eliminar el artículo con id: ${id}`);
        }
    }
}
