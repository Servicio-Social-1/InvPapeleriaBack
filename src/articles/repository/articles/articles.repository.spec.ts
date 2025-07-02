import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesRepository } from './articles.repository';

describe('ArticlesRepository', () => {
    let service: ArticlesRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ArticlesRepository],
        }).compile();

        service = module.get<ArticlesRepository>(ArticlesRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
