import { Test, TestingModule } from '@nestjs/testing';
import { LivecastController } from './livecast.controller';

describe('LivecastController', () => {
  let controller: LivecastController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LivecastController],
    }).compile();

    controller = module.get<LivecastController>(LivecastController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
