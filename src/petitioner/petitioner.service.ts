import {
    Injectable,
    BadRequestException,
    NotFoundException,
} from '@nestjs/common';
import { CreatePetitionerDto } from './dto/create-petitioner.dto';
import { UpdatePetitionerDto } from './dto/update-petitioner.dto';
import { PetitionerRepository } from './repository/petitioner.repository';
import { DbErrorHandlerService } from '../shared/services/db-error-handler/db-error-handler.service';
import { AreaService } from '../area/area.service';
import { SuccessfullyResponse } from '../shared/interfaces/success-response';

@Injectable()
export class PetitionerService {
    constructor(
        private readonly petitionerRepository: PetitionerRepository,
        private readonly areaService: AreaService,
        private readonly dbErrorHandlerService: DbErrorHandlerService,
    ) { }

    async create(createPetitionerDto: CreatePetitionerDto) {
        const area = await this.areaService.findById(createPetitionerDto.area);
        try {
            return await this.petitionerRepository.create(
                createPetitionerDto,
                area,
            );
        } catch (error) {
            this.dbErrorHandlerService.handleError(
                error,
                `El solicitante ${createPetitionerDto.name} ya existe`,
            );
        }
    }

    async findAllByAreaId(areaId: number) {
        const petitioners = await this.petitionerRepository.findAllByArea(
            areaId,
        );
        if (petitioners.length === 0) {
            throw new NotFoundException('Aún no hay solicitantes');
        }
        return petitioners;
    }

    async findAll() {
        const petitioners = await this.petitionerRepository.findAll();
        if (petitioners.length === 0) {
            throw new NotFoundException('Aún no hay solicitantes');
        }
        return petitioners;
    }

    async findById(id: number) {
        const petitioner = await this.petitionerRepository.findById(id);
        if (!petitioner || !petitioner.status) {
            throw new NotFoundException(
                `No se encontró el solicitante con el id: ${id}`,
            );
        }
        return petitioner;
    }

    async update(
        id: number,
        updatePetitionerDto: UpdatePetitionerDto,
    ): Promise<Error | SuccessfullyResponse> {
        const petitioner = await this.findById(id);
        const area = await this.areaService.findById(updatePetitionerDto.area);
        try {
            await this.petitionerRepository.update(
                id,
                area,
                updatePetitionerDto,
            );
            return {
                message: `Solicitante ${petitioner.name} actualizado correctamente.`,
            };
        } catch (error) {
            this.dbErrorHandlerService.handleError(
                error,
                `El solicitante con la descripción ${updatePetitionerDto.name} ya existe`,
            );
        }
    }

    async remove(id: number): Promise<Error | SuccessfullyResponse> {
        const petitioner = await this.findById(id);
        if (!petitioner.status) {
            throw new BadRequestException(
                `El solicitante con el id: ${petitioner.name} ya se encuentra eliminado`,
            );
        }
        const { affected } = await this.petitionerRepository.delete(id);
        if (affected === 1) {
            return {
                message: `solicitante ${petitioner.name} se eliminó correctamente.`,
            };
        }
    }
}
