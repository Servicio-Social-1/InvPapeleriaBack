import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Petitioner } from '../entities/petitioner.entity';
import { CreatePetitionerDto } from '../dto/create-petitioner.dto';
import { Area } from '../../area/entities/area.entity';
import { UpdatePetitionerDto } from '../dto/update-petitioner.dto';

@Injectable()
export class PetitionerRepository {
    constructor(
        @InjectRepository(Petitioner)
        private readonly repository: Repository<Petitioner>,
    ) { }

    async create(createPetitionerDto: CreatePetitionerDto, area: Area) {
        const petitioner = this.repository.create({
            ...createPetitionerDto,
            area,
        });
        return await this.repository.save(petitioner);
    }

    async findAllByArea(areaId: number) {
        // return await this.repository.find({
        //     // Como si fuera or
        //     // where: [{ area: { id: areaId, status: true } }],
        //     // Como si fuera and (lo que necesitamos)
        //     where: [{ area: { id: areaId } }, { status: true }],
        //     order: { name: 'ASC' },
        // });

        return await this.repository
            .createQueryBuilder('petitioner')
            .innerJoinAndSelect('petitioner.area', 'area')
            .where('area.id = :areaId', { areaId })
            .andWhere('petitioner.status = true')
            .execute();
    }

    async findAll() {
        return await this.repository.find({
            where: {
                status: true,
            },
        });
    }

    async findById(id: number) {
        return await this.repository.findOneBy({ id });
    }

    async update(
        id: number,
        area: Area,
        updatePetitionerDto: UpdatePetitionerDto,
    ) {
        return await this.repository.update(
            { id },
            { area, name: updatePetitionerDto.name },
        );
    }

    async delete(id: number) {
        return await this.repository.update({ id }, { status: false });
    }
}
