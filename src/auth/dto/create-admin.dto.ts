import { IsString, MaxLength, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class CreateAdminDto extends CreateUserDto {
    @IsString()
    @MinLength(1)
    @MaxLength(20)
    role: string;
}
