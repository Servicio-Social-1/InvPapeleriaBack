import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';
import { ArticleEntryService } from './article-entry.service';
import { CreateArticleEntryDto } from './dto/create-article/create-article-entry.dto';
import { ValidationPipe } from '@nestjs/common';
import { PaginationDto } from '../shared/dto/pagination.dto';
import { Auth } from 'src/auth/decorators';
import { AdminRoleGuard } from 'src/auth/guards/admin-role.guard';
import { AvailableRoles } from 'src/auth/enum/roles.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('article-entry')
export class ArticleEntryController {
    constructor(private readonly articleEntryService: ArticleEntryService) { }

    @Post()
    @UseGuards(AuthGuard())
    create(
        @Body(new ValidationPipe({ transform: true }))
        createArticleEntryDto: CreateArticleEntryDto,
    ) {
        return this.articleEntryService.create(createArticleEntryDto);
    }

    @Get()
    @UseGuards(AuthGuard())
    findAll(@Query() paginationDto: PaginationDto) {
        return this.articleEntryService.findAll(paginationDto);
    }

    @Get('count')
    @UseGuards(AuthGuard())
    count() {
        return this.articleEntryService.count();
    }

    @Get(':name')
    @UseGuards(AuthGuard())
    findByArticleName(
        @Param('name') name: string,
        @Query() paginationDto: PaginationDto,
    ) {
        return this.articleEntryService.findByName(name, paginationDto);
    }

    @Get('byid/:id')
    @UseGuards(AuthGuard())
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.articleEntryService.findById(id);
    }

    @Patch(':id')
    @UseGuards(AuthGuard())
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ transform: true }))
        createArticleEntryDto: CreateArticleEntryDto,
    ) {
        return this.articleEntryService.update(id, createArticleEntryDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.articleEntryService.remove(id);
    }
}
