import { Test, TestingModule } from '@nestjs/testing';
import { ComplainBoxService } from './complain-box.service';

describe('ComplainBoxService', () => {
  let service: ComplainBoxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComplainBoxService],
    }).compile();

    service = module.get<ComplainBoxService>(ComplainBoxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
