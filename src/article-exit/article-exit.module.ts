import { Module } from '@nestjs/common';
import { ArticleExitService } from './article-exit.service';
import { ArticleExitController } from './article-exit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleExit } from './entities/article-exit.entity';
import { ArticleExitDetail } from './entities/article-exit-details.entity';
import { SharedModule } from '../shared/shared.module';
import { AreaModule } from '../area/area.module';
import { AuthModule } from '../auth/auth.module';
import { PetitionerModule } from '../petitioner/petitioner.module';
import { ArticleExitDetailsRepository } from './repository/article-exit-details.repository';
import { ArticleExitRepository } from './repository/article-exit.repository';
import { ArticlesModule } from '../articles/articles.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ArticleExit, ArticleExitDetail]),
        SharedModule,
        AreaModule,
        AuthModule,
        ArticlesModule,
        PetitionerModule,
    ],
    controllers: [ArticleExitController],
    providers: [
        ArticleExitService,
        ArticleExitRepository,
        ArticleExitDetailsRepository,
    ],
    exports: [TypeOrmModule, ArticleExitService],
})
export class ArticleExitModule { }
