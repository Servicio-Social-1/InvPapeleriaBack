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
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../shared/dto/pagination.dto';
import { UserService } from './user/user.service';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { LoginUserDto } from './dto/login-user.dto copy';
import { User } from './entities/user.entity';
import { Auth, GetUser } from './decorators';
import { AvailableRoles } from './enum/roles.enum';
import { AdminRoleGuard } from './guards/admin-role.guard';
import { UserRoleGuard } from './guards/user-role.guard';
import { TokenDto } from './dto/token.tdo';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) { }

    @Post('register')
    register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @Post('login')
    login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }

    @Get('check-user-status')
    @Auth(UserRoleGuard, [AvailableRoles.USER, AvailableRoles.ADMIN])
    checkUserStatus(@GetUser() user: User) {
        console.log('checkUserStatus - Usuario:', user);
        console.log('checkUserStatus - Rol:', user?.role?.name);
        return this.authService.checkAuthStatus(user);
    }

    @Get('check-admin-status')
    @Auth(AdminRoleGuard, AvailableRoles.ADMIN)
    checkAdminStatus(@GetUser() user: User) {
        return this.authService.checkAuthStatus(user);
    }

    @Post('logged-in')
    hasSession(@Body() tokenDto: TokenDto) {
        return this.authService.hasSession(tokenDto);
    }

    @Get()
    @Auth(UserRoleGuard, [AvailableRoles.USER, AvailableRoles.ADMIN])
    findAll(@Query() paginationDto: PaginationDto) {
        return this.userService.findAll(paginationDto);
    }

    @Get(':term')
    @Auth(AdminRoleGuard, AvailableRoles.ADMIN)
    findOne(@Param('term') term: string & number) {
        return this.userService.findOne(term);
    }

    @Patch(':id')
    @Auth(UserRoleGuard, AvailableRoles.USER)
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.userService.update(id, updateUserDto);
    }

    @Patch('admin/:id')
    @Auth(AdminRoleGuard, AvailableRoles.ADMIN)
    updateUserWithRole(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserWithRoleDto: UpdateUserRoleDto,
    ) {
        return this.userService.updateUserWithRole(id, updateUserWithRoleDto);
    }

    @Delete(':id')
    @Auth(AdminRoleGuard, AvailableRoles.ADMIN)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.userService.remove(id);
    }
}
