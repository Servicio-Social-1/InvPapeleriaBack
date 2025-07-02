import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { AreaRepository } from './repository/area.repository';
import { DbErrorHandlerService } from '../shared/services/db-error-handler/db-error-handler.service';
import { SuccessfullyResponse } from '../shared/interfaces/success-response';

@Injectable()
export class AreaService {
    constructor(
        private readonly areaRepository: AreaRepository,
        private readonly dbErrorHandlerService: DbErrorHandlerService,
    ) { }

    async create(createAreaDto: CreateAreaDto) {
        try {
            return await this.areaRepository.create(createAreaDto);
        } catch (error) {
            this.dbErrorHandlerService.handleError(
                error,
                `El área con el nombre ${createAreaDto.name} ya existe`,
            );
        }
    }

    async findAll() {
        const areas = await this.areaRepository.findAll();
        if (areas.length === 0) {
            throw new BadRequestException('Aún no existen áreas');
        }
        return areas;
    }

    async findById(id: number) {
        const area = await this.areaRepository.findById(id);
        if (!area || !area.status) {
            throw new NotFoundException(
                `No se encontró el área con el id: ${id}`,
            );
        }
        return area;
    }

    async update(
        id: number,
        updateAreaDto: UpdateAreaDto,
    ): Promise<Error | SuccessfullyResponse> {
        const area = await this.findById(id);
        try {
            await this.areaRepository.update(id, updateAreaDto);
            return {
                message: `Area ${area.name} actualizado correctamente.`,
            };
        } catch (error) {
            this.dbErrorHandlerService.handleError(
                error,
                `El área con la descripción ${updateAreaDto.name} ya existe`,
            );
        }
    }

    async remove(id: number): Promise<Error | SuccessfullyResponse> {
        const area = await this.findById(id);
        if (!area) {
            throw new BadRequestException(
                `El área con el id: ${id} no existe`,
            );
        }
        const { affected } = await this.areaRepository.delete(id);
        if (affected === 1) {
            return {
                message: `área ${area.name} se eliminó correctamente.`,
            };
        } else {
            throw new NotFoundException(`No se pudo eliminar el área con id: ${id}`);
        }
    }
}
