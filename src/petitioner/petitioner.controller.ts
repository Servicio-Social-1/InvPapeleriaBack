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
import { PetitionerService } from './petitioner.service';
import { CreatePetitionerDto } from './dto/create-petitioner.dto';
import { UpdatePetitionerDto } from './dto/update-petitioner.dto';
import { Auth } from 'src/auth/decorators';
import { AdminRoleGuard } from 'src/auth/guards/admin-role.guard';
import { UserRoleGuard } from 'src/auth/guards/user-role.guard';
import { AvailableRoles } from 'src/auth/enum/roles.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('petitioner')
export class PetitionerController {
    constructor(private readonly petitionerService: PetitionerService) { }

    @Post()
    @Auth(UserRoleGuard, [AvailableRoles.ADMIN, AvailableRoles.USER])
    create(@Body() createPetitionerDto: CreatePetitionerDto) {
        return this.petitionerService.create(createPetitionerDto);
    }

    @Get(':id')
    @UseGuards(AuthGuard())
    findAllByAreaId(@Param('id', ParseIntPipe) areaId: number) {
        return this.petitionerService.findAllByAreaId(areaId);
    }

    @Get()
    @Auth(AdminRoleGuard, AvailableRoles.ADMIN)
    findAll() {
        return this.petitionerService.findAll();
    }

    @Get('byid/:id')
    @UseGuards(AuthGuard())
    findById(@Param('id', ParseIntPipe) areaId: number) {
        return this.petitionerService.findById(areaId);
    }

    @Patch(':id')
    @Auth(AdminRoleGuard, AvailableRoles.ADMIN)
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePetitionerDto: UpdatePetitionerDto,
    ) {
        return this.petitionerService.update(id, updatePetitionerDto);
    }

    @Delete(':id')
    @Auth(AdminRoleGuard, AvailableRoles.ADMIN)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.petitionerService.remove(id);
    }
}
