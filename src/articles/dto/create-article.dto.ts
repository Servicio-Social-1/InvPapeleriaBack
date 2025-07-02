import { IsInt, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class CreateArticleDto {

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    description: string;

    @IsInt()
    @Min(0)
    stock: number;

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    size: string;
}
