import { Repository } from 'typeorm';
import { Petitioner } from '../entities/petitioner.entity';
import { CreatePetitionerDto } from '../dto/create-petitioner.dto';
import { Area } from '../../area/entities/area.entity';
import { UpdatePetitionerDto } from '../dto/update-petitioner.dto';
export declare class PetitionerRepository {
    private readonly repository;
    constructor(repository: Repository<Petitioner>);
    create(createPetitionerDto: CreatePetitionerDto, area: Area): Promise<Petitioner>;
    findAllByArea(areaId: number): Promise<any>;
    findAll(): Promise<Petitioner[]>;
    findById(id: number): Promise<Petitioner>;
    update(id: number, area: Area, updatePetitionerDto: UpdatePetitionerDto): Promise<import("typeorm").UpdateResult>;
    delete(id: number): Promise<import("typeorm").UpdateResult>;
}
