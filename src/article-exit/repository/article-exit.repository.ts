import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, Like } from 'typeorm';
import { ArticleExit } from '../entities/article-exit.entity';
import { Petitioner } from '../../petitioner/entities/petitioner.entity';
import { Area } from '../../area/entities/area.entity';
import { User } from '../../auth/entities/user.entity';
import { PaginationDto } from '../../shared/dto/pagination.dto';

export class ArticleExitRepository {
    constructor(
        @InjectRepository(ArticleExit)
        private readonly repository: Repository<ArticleExit>,
    ) { }

    async createArticleExit({
        petitioner,
        area,
        user,
    }: {
        petitioner: Petitioner;
        area: Area;
        user: User;
    }) {
        const articleExit = this.repository.create({ petitioner, area, user, date: new Date() + '', time: new Date() + '' });
        return await this.repository.save(articleExit);
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
                articleExitDetail: true,
                
            },
            order: {
                id: 'ASC',
            },
        });
    }

    async findOneById(id: number) {
        return await this.repository.findOne({
            where: { id },
            relations: {
                articleExitDetail: true,
                area: true,
                petitioner: true,
            },
        });
    }

    async findById(id: number) {
        return await this.repository.find({
            where: { id },
            relations: {
                articleExitDetail: true,
                area: true,
                petitioner: true,
            },
        });
    }

    async count() {
        return this.repository.count({ where: { status: true } });
    }

    async findByTerm(term: string, paginationDto: PaginationDto) {
        const { limit = 25, offset = 0 } = paginationDto;
        return await this.repository.find({
            where: 
            [
                {area: {name: ILike(`%${term}%`)}, status:true}, 
                {petitioner: {name: ILike(`%${term}%`)}, status:true}, 
                {user: {email: ILike(`%${term}%`)}, status:true}, 
                {user: {name: ILike(`%${term}%`)}, status:true},
            ],
           skip: offset, order: {id: 'ASC'}, take: limit 
        }, 
        )
    }

    async delete(id: number) {
        return await this.repository.update({ id }, { status: false });
    }

}
