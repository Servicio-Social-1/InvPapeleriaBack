import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ArticleExitService } from './article-exit.service';
import { CreateArticleExitDto } from './dto/create-article-exit/create-article-exit.dto';
import { PaginationDto } from '../shared/dto/pagination.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('article-exit')
export class ArticleExitController {
    constructor(private readonly articleExitService: ArticleExitService) { }

    @Post()
    @UseGuards(AuthGuard())
    create(@Body() createArticleExitDto: CreateArticleExitDto) {
        return this.articleExitService.create(createArticleExitDto);
    }

    @Get()
    @UseGuards(AuthGuard())
    findAll(@Query() paginationDto: PaginationDto) {
        return this.articleExitService.findAll(paginationDto);
    }

    @Get('count')
    @UseGuards(AuthGuard())
    count() {
        return this.articleExitService.count();
    }

    @Get(':name')
    @UseGuards(AuthGuard())
    findByArticleName(
        @Param('name') name: string,
        @Query() paginationDto: PaginationDto,
    ) {
        return this.articleExitService.findByTerm(name, paginationDto);
    }

    @Get('byid/:id')
    @UseGuards(AuthGuard())
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.articleExitService.findById(id);
    }

    @Patch(':id')
    @UseGuards(AuthGuard())
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() createArticleExitDto: CreateArticleExitDto,
    ) {
        return this.articleExitService.update(id, createArticleExitDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.articleExitService.remove(id);
    }
}
