"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleExitService = void 0;
const common_1 = require("@nestjs/common");
const article_exit_repository_1 = require("./repository/article-exit.repository");
const area_service_1 = require("../area/area.service");
const user_service_1 = require("../auth/user/user.service");
const petitioner_service_1 = require("../petitioner/petitioner.service");
const article_exit_details_repository_1 = require("./repository/article-exit-details.repository");
const articles_service_1 = require("../articles/articles.service");
const db_error_handler_service_1 = require("../shared/services/db-error-handler/db-error-handler.service");
const typeorm_1 = require("typeorm");
const article_entity_1 = require("../articles/entities/article.entity");
let ArticleExitService = class ArticleExitService {
    constructor(articleExitRepository, articleExitDetailsRepository, areaService, userService, articleService, petitionerService, dbErrorHandlerService, dataSource) {
        this.articleExitRepository = articleExitRepository;
        this.articleExitDetailsRepository = articleExitDetailsRepository;
        this.areaService = areaService;
        this.userService = userService;
        this.articleService = articleService;
        this.petitionerService = petitionerService;
        this.dbErrorHandlerService = dbErrorHandlerService;
        this.dataSource = dataSource;
    }
    async create(createArticleExitDto) {
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
        const articleExitDetails = await this.createArticleExitDetails(createArticleExitDto, articleExit);
        return this.findById(articleExitDetails[0].articleExit.id);
    }
    async createArticleExitDetails(createArticleExitDto, articleExit) {
        const articles = await Promise.all(createArticleExitDto.articleExitDetails.map((articleDetail) => {
            return this.articleService.findById(articleDetail.idArticle);
        }));
        await this.decreaseArticleStock(articles, createArticleExitDto.articleExitDetails);
        const articleExitDetails = await Promise.all(createArticleExitDto.articleExitDetails.map(async (articleDetail) => this.articleExitDetailsRepository.createEntityInstance({
            amount: articleDetail.amount,
            articleExit,
            article: articles.find((article) => article.id === articleDetail.idArticle),
        })));
        return await this.articleExitDetailsRepository.saveMany(articleExitDetails);
    }
    async findAll(paginationDto) {
        const articleExits = await this.articleExitRepository.findAll(paginationDto);
        if (!articleExits.length) {
            throw new common_1.NotFoundException('Aún no existen vales de salida');
        }
        return articleExits;
    }
    async count() {
        return this.articleExitRepository.count();
    }
    async findByTerm(term, paginationDto) {
        return await this.articleExitRepository.findByTerm(term, paginationDto);
    }
    async findOneById(id) {
        const articleExit = await this.articleExitRepository.findOneById(id);
        if (!articleExit || !articleExit.status) {
            throw new common_1.NotFoundException(`No se encontró la entrada de artículo con el id: ${id}`);
        }
        return articleExit;
    }
    async findById(id) {
        const articleEntries = await this.articleExitRepository.findById(id);
        if (!articleEntries.length || !articleEntries[0].status) {
            throw new common_1.NotFoundException(`No se encontró la entrada de artículo con el id: ${id}`);
        }
        return articleEntries[0];
    }
    async update(id, createArticleExitDto) {
        if (!createArticleExitDto.articleExitDetails.length) {
            throw new common_1.BadRequestException('No has agregado detalles para actualizar');
        }
        const articleExit = await this.findById(id);
        const articles = await Promise.all(createArticleExitDto.articleExitDetails.map((articleDetail) => {
            return this.articleService.findById(articleDetail.idArticle);
        }));
        await this.decreaseArticleStock(articles, createArticleExitDto.articleExitDetails, articleExit.articleExitDetail);
        await this.articleExitDetailsRepository.deleteAllById(id);
        const articleExitDetails = await Promise.all(createArticleExitDto.articleExitDetails.map(async (articleDetail) => this.articleExitDetailsRepository.createEntityInstance({
            amount: articleDetail.amount,
            articleExit,
            article: articles.find((article) => article.id === articleDetail.idArticle),
        })));
        await this.articleExitDetailsRepository.saveMany(articleExitDetails);
        const newArticleExit = await this.findById(id);
        return newArticleExit;
    }
    async remove(id) {
        const articleExit = await this.findById(id);
        await this.increaseStock(articleExit);
        if (!articleExit) {
            throw new common_1.NotFoundException(`No se encontró la entrada del artículo con el id: ${id}`);
        }
        if (!articleExit.status) {
            throw new common_1.BadRequestException(`El artículo con el id: ${articleExit.id} ya se encuentra eliminado`);
        }
        const { affected } = await this.articleExitRepository.delete(id);
        if (affected === 1) {
            return {
                message: `Artículo ${articleExit.id} eliminado correctamente.`,
            };
        }
    }
    async decreaseArticleStock(articles, createArticleExitDetailsDto, articleExitDetail) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            if (articleExitDetail) {
                await Promise.all(articles.map((article) => {
                    const articleAmount = createArticleExitDetailsDto.find((c) => {
                        return c.idArticle === article.id;
                    }).amount;
                    const articleExitAlreadyExistsamount = +articleExitDetail.find((articleExitD) => articleExitD.article.id === article.id)?.amount;
                    let newStock;
                    if (!articleExitAlreadyExistsamount) {
                        newStock = article.stock - articleAmount;
                    }
                    else {
                        newStock =
                            article.stock +
                                articleExitAlreadyExistsamount -
                                articleAmount;
                    }
                    if (newStock < 0) {
                        throw new common_1.BadRequestException('No es posible asignar un valor negativo al stock de un articulo');
                    }
                    return queryRunner.manager.update(article_entity_1.Article, article.id, {
                        stock: newStock,
                    });
                }));
                await queryRunner.commitTransaction();
                await queryRunner.release();
            }
            else {
                await Promise.all(articles.map((article) => {
                    const articleAmount = createArticleExitDetailsDto.find((c) => {
                        return c.idArticle === article.id;
                    }).amount;
                    return queryRunner.manager.update(article_entity_1.Article, article.id, {
                        stock: article.stock - articleAmount,
                    });
                }));
                await queryRunner.commitTransaction();
                await queryRunner.release();
            }
        }
        catch (error) {
            console.log(error);
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            throw new common_1.BadRequestException('No es posible asignar un valor negativo al stock de un articulo');
        }
    }
    async increaseStock(articleExit) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await Promise.all(articleExit.articleExitDetail.map(({ article, amount }) => {
                return queryRunner.manager.update(article_entity_1.Article, article.id, {
                    stock: article.stock + +amount,
                });
            }));
            await queryRunner.commitTransaction();
            await queryRunner.release();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            throw new common_1.BadRequestException('No es posible tener un stock mayor a 10,000');
        }
    }
};
ArticleExitService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [article_exit_repository_1.ArticleExitRepository,
        article_exit_details_repository_1.ArticleExitDetailsRepository,
        area_service_1.AreaService,
        user_service_1.UserService,
        articles_service_1.ArticlesService,
        petitioner_service_1.PetitionerService,
        db_error_handler_service_1.DbErrorHandlerService,
        typeorm_1.DataSource])
], ArticleExitService);
exports.ArticleExitService = ArticleExitService;
//# sourceMappingURL=article-exit.service.js.map