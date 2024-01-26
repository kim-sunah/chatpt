import { Test, TestingModule } from '@nestjs/testing';
import { LivecastService } from './livecast.service';

describe('LivecastService', () => {
  let service: LivecastService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LivecastService],
    }).compile();

    service = module.get<LivecastService>(LivecastService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
