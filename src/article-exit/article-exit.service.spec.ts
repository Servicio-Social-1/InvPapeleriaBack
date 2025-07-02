import { Test, TestingModule } from '@nestjs/testing';
import { ArticleExitService } from './article-exit.service';

describe('ArticleExitService', () => {
  let service: ArticleExitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleExitService],
    }).compile();

    service = module.get<ArticleExitService>(ArticleExitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
