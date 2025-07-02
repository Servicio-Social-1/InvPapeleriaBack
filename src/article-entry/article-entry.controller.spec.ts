import { Test, TestingModule } from '@nestjs/testing';
import { ArticleEntryController } from './article-entry.controller';
import { ArticleEntryService } from './article-entry.service';

describe('ArticleEntryController', () => {
  let controller: ArticleEntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleEntryController],
      providers: [ArticleEntryService],
    }).compile();

    controller = module.get<ArticleEntryController>(ArticleEntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
