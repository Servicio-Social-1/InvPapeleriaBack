import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { ArticleEntryModule } from './article-entry/article-entry.module';
import { ArticleExitModule } from './article-exit/article-exit.module';
import { AuthModule } from './auth/auth.module';
import { PetitionerModule } from './petitioner/petitioner.module';
import { AreaModule } from './area/area.module';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './shared/shared.module';
import { SeedModule } from './seed/seed.module';
import { PdfGeneratorModule } from './pdf-generator/pdf-generator.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import fs from 'fs';
import { AppController } from './app.controller';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            database: process.env.DB_NAME,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            autoLoadEntities: true,
            synchronize: process.env.STAGE === 'dev',
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
        ArticlesModule,
        ArticleEntryModule,
        ArticleExitModule,
        AuthModule,
        PetitionerModule,
        AreaModule,
        SharedModule,
        SeedModule,
        PdfGeneratorModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule { }
