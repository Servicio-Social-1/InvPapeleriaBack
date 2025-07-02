import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { ArticlesRepository } from './repository/articles/articles.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([Article]), SharedModule, AuthModule],
    controllers: [ArticlesController],
    providers: [ArticlesService, ArticlesRepository],
    exports: [TypeOrmModule, ArticlesService],
})
export class ArticlesModule { }
