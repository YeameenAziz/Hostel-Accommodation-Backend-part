import { Test, TestingModule } from '@nestjs/testing';
import { PlayZoneService } from './play-zone.service';

describe('PlayZoneService', () => {
  let service: PlayZoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayZoneService],
    }).compile();

    service = module.get<PlayZoneService>(PlayZoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
