import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from '../dto/role.dto';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Post()
    create(@Body() roleDto: RoleDto) {
        return this.roleService.create(roleDto);
    }

    @Get()
    findAll() {
        return this.roleService.findAll();
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() roleDto: RoleDto) {
        return this.roleService.update(id, roleDto);
    }
}
