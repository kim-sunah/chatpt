import { Test, TestingModule } from '@nestjs/testing';
import { CartlistController } from './cartlist.controller';

describe('CartlistController', () => {
  let controller: CartlistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartlistController],
    }).compile();

    controller = module.get<CartlistController>(CartlistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
