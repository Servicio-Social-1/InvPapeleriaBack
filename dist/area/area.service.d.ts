import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { AreaRepository } from './repository/area.repository';
import { DbErrorHandlerService } from '../shared/services/db-error-handler/db-error-handler.service';
import { SuccessfullyResponse } from '../shared/interfaces/success-response';
export declare class AreaService {
    private readonly areaRepository;
    private readonly dbErrorHandlerService;
    constructor(areaRepository: AreaRepository, dbErrorHandlerService: DbErrorHandlerService);
    create(createAreaDto: CreateAreaDto): Promise<import("./entities/area.entity").Area>;
    findAll(): Promise<import("./entities/area.entity").Area[]>;
    findById(id: number): Promise<import("./entities/area.entity").Area>;
    update(id: number, updateAreaDto: UpdateAreaDto): Promise<Error | SuccessfullyResponse>;
    remove(id: number): Promise<Error | SuccessfullyResponse>;
}
