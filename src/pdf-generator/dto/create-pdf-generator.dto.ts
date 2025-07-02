import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class CreatePdfGeneratorDto {
    @IsIn(['entry', 'exit', 'inventory'])
    type: string;

    @IsNumber()
    @Min(1)
    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    id?: number;
}
