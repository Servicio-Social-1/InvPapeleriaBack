import {
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Query,
    ParseIntPipe,
    Body,
} from '@nestjs/common';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AvailableRoles } from '../enum/roles.enum';
import { AdminRoleGuard } from '../guards/admin-role.guard';
import { Auth } from '../decorators';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @Auth(AdminRoleGuard, AvailableRoles.ADMIN)
    findAll(@Query() paginationDto: PaginationDto) {
        return this.userService.findAll(paginationDto);
    }

    @Get('byid/:id')
    @Auth(AdminRoleGuard, AvailableRoles.ADMIN)
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findById(id);
    }

    @Get('count')
    @Auth(AdminRoleGuard, AvailableRoles.ADMIN)
    count() {
        return this.userService.count();
    }

    @Get(':role')
    @Auth(AdminRoleGuard, AvailableRoles.ADMIN)
    findAllByRole(
        @Param('role') role: string,
        @Query() paginationDto: PaginationDto,
    ) {
        return this.userService.findAllByRole(role, paginationDto);
    }

    @Patch(':id')
    @Auth(AdminRoleGuard, AvailableRoles.ADMIN)
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateArticleDto: UpdateUserDto,
    ) {
        return this.userService.update(id, updateArticleDto);
    }

    @Delete(':id')
    @Auth(AdminRoleGuard, AvailableRoles.ADMIN)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.userService.remove(id);
    }
}
