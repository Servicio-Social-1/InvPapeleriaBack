import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { CreateArticleExitDto } from './dto/create-article-exit/create-article-exit.dto';
import { ArticleExitRepository } from './repository/article-exit.repository';
import { AreaService } from '../area/area.service';
import { UserService } from '../auth/user/user.service';
import { PetitionerService } from '../petitioner/petitioner.service';
import { ArticleExit } from './entities/article-exit.entity';
import { CreateArticleExitDetailsDto } from './dto/create-article-exit-details/create-article-exit-details.dto';
import { ArticleExitDetailsRepository } from './repository/article-exit-details.repository';
import { ArticlesService } from '../articles/articles.service';
import { PaginationDto } from '../shared/dto/pagination.dto';
import { SuccessfullyResponse } from '../shared/interfaces/success-response';
import { DbErrorHandlerService } from '../shared/services/db-error-handler/db-error-handler.service';
import { DataSource } from 'typeorm';
import { Article } from '../articles/entities/article.entity';
import { ArticleExitDetail } from './entities/article-exit-details.entity';

@Injectable()
export class ArticleExitService {
    constructor(
        private readonly articleExitRepository: ArticleExitRepository,
        private readonly articleExitDetailsRepository: ArticleExitDetailsRepository,
        private readonly areaService: AreaService,
        private readonly userService: UserService,
        private readonly articleService: ArticlesService,
        private readonly petitionerService: PetitionerService,
        private readonly dbErrorHandlerService: DbErrorHandlerService,
        private readonly dataSource: DataSource,
    ) { }

    async create(createArticleExitDto: CreateArticleExitDto) {
        const [petitioner, user, area] = await Promise.all([
            this.petitionerService.findById(createArticleExitDto.idPetitioner),
            this.userService.findById(createArticleExitDto.idUser),
            this.areaService.findById(createArticleExitDto.idArea),
        ]);
        const articleExit = await this.articleExitRepository.createArticleExit({
            petitioner,
            user,
            area,
        });
        const articleExitDetails = await this.createArticleExitDetails(
            createArticleExitDto,
            articleExit,
            
        );
        return this.findById(articleExitDetails[0].articleExit.id);
    }

    private async createArticleExitDetails(
        createArticleExitDto: CreateArticleExitDto,
        articleExit: ArticleExit,
    ) {
        const articles = await Promise.all(
            createArticleExitDto.articleExitDetails.map((articleDetail) => {
                return this.articleService.findById(articleDetail.idArticle);
            }),
        );

        await this.decreaseArticleStock(
            articles,
            createArticleExitDto.articleExitDetails,
        );

        const articleExitDetails = await Promise.all(
            createArticleExitDto.articleExitDetails.map(
                async (articleDetail: CreateArticleExitDetailsDto) =>
                    this.articleExitDetailsRepository.createEntityInstance({
                        amount: articleDetail.amount,
                        articleExit,
                        article: articles.find(
                            (article) => article.id === articleDetail.idArticle,
                        ),
                    }),
            ),
        );
        return await this.articleExitDetailsRepository.saveMany(
            articleExitDetails,
        );
    }

    async findAll(paginationDto: PaginationDto) {
        const articleExits = await this.articleExitRepository.findAll(
            paginationDto,
        );
        if (!articleExits.length) {
            throw new NotFoundException('Aún no existen vales de salida');
        }
        return articleExits;
    }

    async count() {
        return this.articleExitRepository.count();
    }

    async findByTerm(term: string, paginationDto: PaginationDto) {
        return await this.articleExitRepository.findByTerm(
            term,
            paginationDto,
        );
    }

    async findOneById(id: number) {
        const articleExit = await this.articleExitRepository.findOneById(id);
        if (!articleExit || !articleExit.status) {
            throw new NotFoundException(
                `No se encontró la entrada de artículo con el id: ${id}`,
            );
        }
        return articleExit;
    }

    async findById(id: number) {
        const articleEntries = await this.articleExitRepository.findById(id);
        if (!articleEntries.length || !articleEntries[0].status) {
            throw new NotFoundException(
                `No se encontró la entrada de artículo con el id: ${id}`,
            );
        }
        return articleEntries[0];
    }

    async update(id: number, createArticleExitDto: CreateArticleExitDto) {
        if (!createArticleExitDto.articleExitDetails.length) {
            throw new BadRequestException(
                'No has agregado detalles para actualizar',
            );
        }
        const articleExit = await this.findById(id);
        const articles = await Promise.all(
            createArticleExitDto.articleExitDetails.map((articleDetail) => {
                return this.articleService.findById(articleDetail.idArticle);
            }),
        );
        await this.decreaseArticleStock(
            articles,
            createArticleExitDto.articleExitDetails,
            articleExit.articleExitDetail,
        );
        await this.articleExitDetailsRepository.deleteAllById(id);
        const articleExitDetails = await Promise.all(
            createArticleExitDto.articleExitDetails.map(
                async (articleDetail: CreateArticleExitDetailsDto) =>
                    this.articleExitDetailsRepository.createEntityInstance({
                        amount: articleDetail.amount,
                        articleExit,
                        article: articles.find(
                            (article) => article.id === articleDetail.idArticle,
                        ),
                    }),
            ),
        );
        await this.articleExitDetailsRepository.saveMany(articleExitDetails);
        const newArticleExit = await this.findById(id);
        return newArticleExit;
    }

    async remove(id: number): Promise<Error | SuccessfullyResponse> {
        const articleExit = await this.findById(id);
        await this.increaseStock(articleExit);
        if (!articleExit) {
            throw new NotFoundException(
                `No se encontró la entrada del artículo con el id: ${id}`,
            );
        }
        if (!articleExit.status) {
            throw new BadRequestException(
                `El artículo con el id: ${articleExit.id} ya se encuentra eliminado`,
            );
        }
        const { affected } = await this.articleExitRepository.delete(id);
        if (affected === 1) {
            return {
                message: `Artículo ${articleExit.id} eliminado correctamente.`,
            };
        }
    }

    private async decreaseArticleStock(
        articles: Article[],
        createArticleExitDetailsDto: CreateArticleExitDetailsDto[],
        articleExitDetail?: ArticleExitDetail[],
    ) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            if (articleExitDetail) {
                await Promise.all(
                    articles.map((article) => {
                        const articleAmount = createArticleExitDetailsDto.find(
                            (c) => {
                                return c.idArticle === article.id;
                            },
                        ).amount;
                        // Es posible que al editar el vale de salida se agregue otro articulo en el formulario, en ese caso este valor dara undefined
                        const articleExitAlreadyExistsamount =
                            +articleExitDetail.find(
                                (articleExitD) =>
                                    articleExitD.article.id === article.id,
                            )?.amount;
                        let newStock: number;
                        if(!articleExitAlreadyExistsamount) {
                            newStock = article.stock - articleAmount;
                        }else {
                            newStock =
                                article.stock +
                                articleExitAlreadyExistsamount -
                                articleAmount;
                        }
                        if (newStock < 0) {
                            throw new BadRequestException(
                                'No es posible asignar un valor negativo al stock de un articulo',
                            );
                        }
                        return queryRunner.manager.update(Article, article.id, {
                            stock: newStock,
                        });
                    }),
                );
                await queryRunner.commitTransaction();
                await queryRunner.release();
            } else {
                await Promise.all(
                    articles.map((article) => {
                        const articleAmount = createArticleExitDetailsDto.find(
                            (c) => {
                                return c.idArticle === article.id;
                            },
                        ).amount;
                        return queryRunner.manager.update(Article, article.id, {
                            stock: article.stock - articleAmount,
                        });
                    }),
                );
                await queryRunner.commitTransaction();
                await queryRunner.release();
            }
        } catch (error) {
            console.log(error);
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            throw new BadRequestException(
                'No es posible asignar un valor negativo al stock de un articulo',
            );
        }
    }
    // aumentar stock al eliminar vale de salida
    private async increaseStock(articleExit: ArticleExit) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await Promise.all(
                articleExit.articleExitDetail.map(({ article, amount }) => {
                    return queryRunner.manager.update(Article, article.id, {
                        stock: article.stock + +amount,
                    });
                }),
            );
            await queryRunner.commitTransaction();
            await queryRunner.release();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            throw new BadRequestException(
                'No es posible tener un stock mayor a 10,000',
            );
        }
    }
}
