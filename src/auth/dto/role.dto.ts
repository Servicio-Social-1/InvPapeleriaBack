import { IsString, MaxLength, MinLength } from 'class-validator';

export class RoleDto {
    @IsString()
    @MinLength(1)
    @MaxLength(20)
    name: string;
}
