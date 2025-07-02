import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UpdateUserRoleDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(3)
    @MaxLength(100)
    @IsOptional()
    name: string;

    @IsString()
    @MinLength(8)
    @MaxLength(50)
    @IsOptional()
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
            'La contraseña debe tener una letra mayúscula, una minúscula y un número, además de ser de mínimo 8 caracteres',
    })
    password?: string;

    @IsString()
    @MinLength(1)
    @MaxLength(20)
    @IsOptional()
    role?: string;
}
