import { Test, TestingModule } from '@nestjs/testing';
import { ArticleExitController } from './article-exit.controller';
import { ArticleExitService } from './article-exit.service';

describe('ArticleExitController', () => {
  let controller: ArticleExitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleExitController],
      providers: [ArticleExitService],
    }).compile();

    controller = module.get<ArticleExitController>(ArticleExitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
