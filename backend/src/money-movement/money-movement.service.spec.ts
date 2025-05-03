import { Test, TestingModule } from '@nestjs/testing';
import { MoneyMovementService } from './money-movement.service';

describe('MoneyMovementService', () => {
  let service: MoneyMovementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoneyMovementService],
    }).compile();

    service = module.get<MoneyMovementService>(MoneyMovementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
