import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';


export class CreateArticleExitDetailsDto {
    @IsInt()
    @Min(1)
    @Type(() => Number) // equivalente a enableImplicitConvertions: true en main.ts ValidatorPipe
    idArticle: number;

    @IsInt()
    @Min(1)
    @Type(() => Number) // equivalente a enableImplicitConvertions: true en main.ts ValidatorPipe
    amount: number;
}

export class CreateArticleExitDetailsDtoWithIdExitDto extends CreateArticleExitDetailsDto {
    @IsInt()
    @Min(1)
    idExit: number;
}
