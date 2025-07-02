import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntry } from '../entities/article-entry.entity';
import { Repository, ILike } from 'typeorm';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { User } from '../../auth/entities/user.entity';

@Injectable()
export class ArticleEntryRepository {
    constructor(
        @InjectRepository(ArticleEntry)
        private readonly repository: Repository<ArticleEntry>,
    ) { }

    async createArticleEntry(user: User) {
        const articleEntry = this.repository.create({ user });
        return await this.repository.save(articleEntry);
    }

    async findAll(paginationDto: PaginationDto) {
        const { limit = 20, offset = 0 } = paginationDto;
        return this.repository.find({
            take: limit,
            skip: offset,
            where: {
                status: true,
            },
            relations: {
                articleEntryDetail: true,
            },
            order: {
                id: 'ASC',
            },
        });
    }

    async count() {
        return await this.repository.count({ where: { status: true } });
    }

    async findOneById(id: number) {
        return await this.repository.findOne({
            where: { id },
            relations: { articleEntryDetail: true },
        });
    }

    async findById(id: number) {
        return await this.repository.find({
            where: { id },
            relations: { articleEntryDetail: true },
        });
    }

    async findByArticleName(name: string, paginationDto: PaginationDto) {
        const { limit = 20, offset = 0 } = paginationDto;
        return await this.repository.find({
            take: limit,
            skip: offset,
            where: {
                articleEntryDetail: {
                    article: { description: ILike(`%${name}%`) },
                },
            },
            relations: {
                articleEntryDetail: true,
            },
        });
    }

    async delete(id: number) {
        return await this.repository.update({ id }, { status: false });
    }
}
