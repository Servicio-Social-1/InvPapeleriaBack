import { Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area } from './entities/area.entity';
import { AreaRepository } from './repository/area.repository';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Area]), 
        SharedModule,
        AuthModule
    ],
    controllers: [AreaController],
    providers: [AreaService, AreaRepository],
    exports: [TypeOrmModule, AreaService],
})
export class AreaModule { }
