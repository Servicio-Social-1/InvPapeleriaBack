import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsInt, Min, ValidateNested } from 'class-validator';
import { CreateArticleEntryDetailsDto } from '../create-article-details/create-article-entry-details.dto';

export class CreateArticleEntryDto {
    @IsInt()
    @Min(1)
    idUser: number;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateArticleEntryDetailsDto)
    articleEntryDetails: CreateArticleEntryDetailsDto[];
}
