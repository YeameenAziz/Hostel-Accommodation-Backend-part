import { Test, TestingModule } from '@nestjs/testing';
import { ComplainBoxController } from './complain-box.controller';

describe('ComplainBoxController', () => {
  let controller: ComplainBoxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComplainBoxController],
    }).compile();

    controller = module.get<ComplainBoxController>(ComplainBoxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
