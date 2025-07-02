import { Module } from '@nestjs/common';
import { PetitionerService } from './petitioner.service';
import { PetitionerController } from './petitioner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Petitioner } from './entities/petitioner.entity';
import { SharedModule } from '../shared/shared.module';
import { PetitionerRepository } from './repository/petitioner.repository';
import { AreaModule } from '../area/area.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([Petitioner]), SharedModule, AreaModule, AuthModule],
    controllers: [PetitionerController],
    providers: [PetitionerService, PetitionerRepository],
    exports: [TypeOrmModule, PetitionerService],
})
export class PetitionerModule { }
