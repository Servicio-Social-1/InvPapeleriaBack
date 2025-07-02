import { Test, TestingModule } from '@nestjs/testing';
import { ArticleEntryService } from './article-entry.service';

describe('ArticleEntryService', () => {
  let service: ArticleEntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleEntryService],
    }).compile();

    service = module.get<ArticleEntryService>(ArticleEntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
