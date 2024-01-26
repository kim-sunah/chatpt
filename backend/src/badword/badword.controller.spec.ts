import { Test, TestingModule } from '@nestjs/testing';
import { BadwordController } from './badword.controller';

describe('BadwordController', () => {
  let controller: BadwordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BadwordController],
    }).compile();

    controller = module.get<BadwordController>(BadwordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
