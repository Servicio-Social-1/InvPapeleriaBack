import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
export declare class AreaController {
    private readonly areaService;
    constructor(areaService: AreaService);
    create(createAreaDto: CreateAreaDto): Promise<import("./entities/area.entity").Area>;
    findAll(): Promise<import("./entities/area.entity").Area[]>;
    update(id: number, updateAreaDto: UpdateAreaDto): Promise<Error | import("../shared/interfaces/success-response").SuccessfullyResponse>;
    remove(id: number): Promise<Error | import("../shared/interfaces/success-response").SuccessfullyResponse>;
}
