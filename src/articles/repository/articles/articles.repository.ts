import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Article } from '../../entities/article.entity';
import { CreateArticleDto } from '../../dto/create-article.dto';
import { PaginationDto } from '../../../shared/dto/pagination.dto';
import { UpdateArticleDto } from '../../dto/update-article.dto';

@Injectable()
export class ArticlesRepository {
    constructor(
        @InjectRepository(Article)
        private readonly repository: Repository<Article>,
    ) { }

    async create(createArticleDto: CreateArticleDto) {
        const article = this.repository.create(createArticleDto);
        return await this.repository.save(article);
    }

    async findById(id: number) {
        return await this.findByIdAnyStatus(id);
    }

    async findByIdAnyStatus(id: number) {
        return await this.repository.findOne({ where: { id } });
    }

    async findByDescription(
        descriptionLike: string,
        paginationDto: PaginationDto,
    ) {
        const { limit = 20, offset = 0 } = paginationDto;
        return await this.repository.find({
            where: { description: ILike(`%${descriptionLike}%`) },
            take: limit,
            skip: offset,
            order: {
                id: 'ASC',
            },
        });
    }

    async findAllPaginated(paginationDto: PaginationDto) {
        const { limit = 20, offset = 0 } = paginationDto;
        return this.repository.find({
            take: limit,
            skip: offset,
            order: {
                id: 'ASC',
            },
            // relations :{
            //     article-entry: true,
            //     etc
            // }
        });
    }

    async findAll() {
        return this.repository.find({
            order: {
                id: 'ASC',
            },
        });
    }

    async count() {
        return await this.repository.count();
    }

    async update(id: number, updateArticleDto: UpdateArticleDto) {
        return await this.repository.update(
            { id },
            { id, ...updateArticleDto },
        );
    }

    // Eliminar método de borrado lógico, solo dejar el físico
    async delete(id: number) {
        // Borrado físico usando el método nativo de TypeORM
        return await this.repository.delete(id);
    }

    // async deletePhysical(id: number) {
    //     // Borrado físico del registro
    //     return await this.repository.delete(id);
    // }
}
