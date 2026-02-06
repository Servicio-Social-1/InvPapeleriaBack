import { PetitionerService } from './petitioner.service';
import { CreatePetitionerDto } from './dto/create-petitioner.dto';
import { UpdatePetitionerDto } from './dto/update-petitioner.dto';
export declare class PetitionerController {
    private readonly petitionerService;
    constructor(petitionerService: PetitionerService);
    create(createPetitionerDto: CreatePetitionerDto): Promise<import("./entities/petitioner.entity").Petitioner>;
    findAllByAreaId(areaId: number): Promise<any>;
    findAll(): Promise<import("./entities/petitioner.entity").Petitioner[]>;
    findById(areaId: number): Promise<import("./entities/petitioner.entity").Petitioner>;
    update(id: number, updatePetitionerDto: UpdatePetitionerDto): Promise<Error | import("../shared/interfaces/success-response").SuccessfullyResponse>;
    remove(id: number): Promise<Error | import("../shared/interfaces/success-response").SuccessfullyResponse>;
}
