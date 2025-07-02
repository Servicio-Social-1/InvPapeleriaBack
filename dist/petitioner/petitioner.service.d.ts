import { CreatePetitionerDto } from './dto/create-petitioner.dto';
import { UpdatePetitionerDto } from './dto/update-petitioner.dto';
import { PetitionerRepository } from './repository/petitioner.repository';
import { DbErrorHandlerService } from '../shared/services/db-error-handler/db-error-handler.service';
import { AreaService } from '../area/area.service';
import { SuccessfullyResponse } from '../shared/interfaces/success-response';
export declare class PetitionerService {
    private readonly petitionerRepository;
    private readonly areaService;
    private readonly dbErrorHandlerService;
    constructor(petitionerRepository: PetitionerRepository, areaService: AreaService, dbErrorHandlerService: DbErrorHandlerService);
    create(createPetitionerDto: CreatePetitionerDto): Promise<import("./entities/petitioner.entity").Petitioner>;
    findAllByAreaId(areaId: number): Promise<any>;
    findAll(): Promise<import("./entities/petitioner.entity").Petitioner[]>;
    findById(id: number): Promise<import("./entities/petitioner.entity").Petitioner>;
    update(id: number, updatePetitionerDto: UpdatePetitionerDto): Promise<Error | SuccessfullyResponse>;
    remove(id: number): Promise<Error | SuccessfullyResponse>;
}
