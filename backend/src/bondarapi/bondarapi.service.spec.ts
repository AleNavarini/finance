import { Test, TestingModule } from '@nestjs/testing';
import { BondarapiService } from './bondarapi.service';

describe('BondarapiService', () => {
  let service: BondarapiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BondarapiService],
    }).compile();

    service = module.get<BondarapiService>(BondarapiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
