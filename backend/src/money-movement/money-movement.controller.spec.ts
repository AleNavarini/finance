import { Test, TestingModule } from '@nestjs/testing';
import { MoneyMovementController } from './money-movement.controller';
import { MoneyMovementService } from './money-movement.service';

describe('MoneyMovementController', () => {
  let controller: MoneyMovementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoneyMovementController],
      providers: [MoneyMovementService],
    }).compile();

    controller = module.get<MoneyMovementController>(MoneyMovementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
