import { Test, TestingModule } from '@nestjs/testing';
import { PlayZoneController } from './play-zone.controller';

describe('PlayZoneController', () => {
  let controller: PlayZoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayZoneController],
    }).compile();

    controller = module.get<PlayZoneController>(PlayZoneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
