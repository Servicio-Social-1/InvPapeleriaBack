import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';
import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { AdminRoleGuard } from '../auth/guards/admin-role.guard';
import { UserRoleGuard } from '../auth/guards/user-role.guard';
import { AvailableRoles } from '../auth/enum/roles.enum';
import { Auth } from 'src/auth/decorators';
import { AuthGuard } from '@nestjs/passport';

@Controller('area')
export class AreaController {
    constructor(private readonly areaService: AreaService) { }

    @Post()
    @Auth(UserRoleGuard, [AvailableRoles.ADMIN, AvailableRoles.USER])
    create(@Body() createAreaDto: CreateAreaDto) {
        return this.areaService.create(createAreaDto);
    }
    
    @Get()
    @UseGuards(AuthGuard())
    findAll() {
        return this.areaService.findAll();
    }
    
    @Patch(':id')
    @Auth(AdminRoleGuard, AvailableRoles.ADMIN)
    update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAreaDto: UpdateAreaDto,
    ) {
        return this.areaService.update(id, updateAreaDto);
    }
        
    @Delete(':id')
    @Auth(AdminRoleGuard, AvailableRoles.ADMIN)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.areaService.remove(id);
    }
}
