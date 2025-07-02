import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsInt, Min, ValidateNested } from 'class-validator';
import { CreateArticleExitDetailsDto } from '../create-article-exit-details/create-article-exit-details.dto';

export class CreateArticleExitDto {
    @IsInt()
    @Min(1)
    idPetitioner: number;

    @IsInt()
    @Min(1)
    idArea: number;

    @IsInt()
    @Min(1)
    idUser: number;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateArticleExitDetailsDto)
    articleExitDetails: CreateArticleExitDetailsDto[];
}
