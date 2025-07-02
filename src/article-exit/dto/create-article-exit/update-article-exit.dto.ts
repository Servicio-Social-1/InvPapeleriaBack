import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleExitDto } from './create-article-exit.dto';

export class UpdateArticleExitDto extends PartialType(CreateArticleExitDto) {}
