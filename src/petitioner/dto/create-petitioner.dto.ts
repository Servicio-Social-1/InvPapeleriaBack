import { IsInt, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreatePetitionerDto {
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    name: string;

    @IsInt()
    @Min(1)
    area: number;
}
