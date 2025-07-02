import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationDto {
    @IsOptional()
    @IsNumber()
    @Min(0)
    // Transform
    @Type(() => Number) // equivalente a enableImplicitConvertions: true en main.ts ValidatorPipe
    limit?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(() => Number) // enableImplicitConvertions: true
    offset?: number;
}
