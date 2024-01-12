import { Test, TestingModule } from '@nestjs/testing';
import { CartlistService } from './cartlist.service';

describe('CartlistService', () => {
  let service: CartlistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartlistService],
    }).compile();

    service = module.get<CartlistService>(CartlistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
