import {
    IsEmail,
    IsString,
} from 'class-validator';

export class TokenDto {
    @IsString()
    token: string;
}
