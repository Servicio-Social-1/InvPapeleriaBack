import { Body, Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';
import { CreateUserDto } from '../auth/dto/create-user.dto';

@Controller('seed')
export class SeedController {
    constructor(private readonly seedService: SeedService) { }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.seedService.createAdmin(createUserDto);
    }
}
