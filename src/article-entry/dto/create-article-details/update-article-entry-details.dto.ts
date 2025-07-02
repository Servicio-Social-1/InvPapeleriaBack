import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleEntryDetailsDto } from './create-article-entry-details.dto';

export class UpdateArticleEntryDetailsDto extends PartialType(
    CreateArticleEntryDetailsDto,
) { }
