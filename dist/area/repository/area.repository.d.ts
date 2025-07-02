import { Area } from '../entities/area.entity';
import { Repository } from 'typeorm';
import { CreateAreaDto } from '../dto/create-area.dto';
import { UpdateAreaDto } from '../dto/update-area.dto';
export declare class AreaRepository {
    private readonly repository;
    constructor(repository: Repository<Area>);
    create(createAreaDto: CreateAreaDto): Promise<Area>;
    findAll(): Promise<Area[]>;
    findById(id: number): Promise<Area>;
    update(id: number, updateAreaDto: UpdateAreaDto): Promise<import("typeorm").UpdateResult>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
