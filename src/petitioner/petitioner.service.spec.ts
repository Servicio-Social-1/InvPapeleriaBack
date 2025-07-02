import { Test, TestingModule } from '@nestjs/testing';
import { PetitionerService } from './petitioner.service';

describe('PetitionerService', () => {
  let service: PetitionerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetitionerService],
    }).compile();

    service = module.get<PetitionerService>(PetitionerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
