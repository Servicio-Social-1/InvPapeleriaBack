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
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PaginationDto } from '../shared/dto/pagination.dto';
import { Auth } from 'src/auth/decorators';
import { AdminRoleGuard } from 'src/auth/guards/admin-role.guard';
import { AvailableRoles } from 'src/auth/enum/roles.enum';
import { UserRoleGuard } from 'src/auth/guards/user-role.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) { }

    @Post()
    // @Auth(UserRoleGuard, AvailableRoles.USER)
    @UseGuards(AuthGuard())
    create(@Body() createArticleDto: CreateArticleDto) {
        return this.articlesService.create(createArticleDto);
    }

    @Get()
    // @Auth(UserRoleGuard, AvailableRoles.USER)
    @UseGuards(AuthGuard())
    findAll(@Query() paginationDto: PaginationDto) {
        return this.articlesService.findAllPaginated(paginationDto);
    }

    @Get('count')
    @UseGuards(AuthGuard())
    count() {
        return this.articlesService.count();
    }

    @Get(':term')
    @UseGuards(AuthGuard())
    findByidOrName(
        @Param('term') term: string & number,
        @Query() paginationDto: PaginationDto,
    ) {
        return this.articlesService.findByidOrName(term, paginationDto);
    }

    @Patch(':id')
    @Auth(AdminRoleGuard, AvailableRoles.ADMIN)
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateArticleDto: UpdateArticleDto,
    ) {
        return this.articlesService.update(id, updateArticleDto);
    }

    @Delete(':id')
    @Auth(AdminRoleGuard, AvailableRoles.ADMIN)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.articlesService.remove(id);
    }
}
