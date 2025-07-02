import { Test, TestingModule } from '@nestjs/testing';
import { PetitionerController } from './petitioner.controller';
import { PetitionerService } from './petitioner.service';

describe('PetitionerController', () => {
  let controller: PetitionerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetitionerController],
      providers: [PetitionerService],
    }).compile();

    controller = module.get<PetitionerController>(PetitionerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
