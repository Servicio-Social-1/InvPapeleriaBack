import { Test, TestingModule } from '@nestjs/testing';
import { DbErrorHandlerService } from './db-error-handler.service';

describe('DbErrorHandlerService', () => {
  let service: DbErrorHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbErrorHandlerService],
    }).compile();

    service = module.get<DbErrorHandlerService>(DbErrorHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
