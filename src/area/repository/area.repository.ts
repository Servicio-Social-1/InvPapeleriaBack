import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Area } from '../entities/area.entity';
import { Repository } from 'typeorm';
import { CreateAreaDto } from '../dto/create-area.dto';
import { UpdateAreaDto } from '../dto/update-area.dto';

@Injectable()
export class AreaRepository {
    constructor(
        @InjectRepository(Area)
        private readonly repository: Repository<Area>,
    ) { }

    async create(createAreaDto: CreateAreaDto) {
        const area = await this.repository.create(createAreaDto);
        return await this.repository.save(area);
    }

    async findAll() {
        return await this.repository.find({ order: { id: 'ASC' }, where: { status: true } });
    }

    async findById(id: number) {
        return await this.repository.findOneBy({ id });
    }

    async update(id: number, updateAreaDto: UpdateAreaDto) {
        return await this.repository.update(id, { id, ...updateAreaDto });
    }

    async delete(id: number) {
        // Borrado físico del registro
        return await this.repository.delete(id);
    }
}
