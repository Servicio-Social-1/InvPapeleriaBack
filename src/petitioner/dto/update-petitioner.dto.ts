import { PartialType } from '@nestjs/mapped-types';
import { CreatePetitionerDto } from './create-petitioner.dto';

export class UpdatePetitionerDto extends PartialType(CreatePetitionerDto) {}
