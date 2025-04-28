import { Module } from '@nestjs/common';
import { MoneyMovementService } from './money-movement.service';
import { MoneyMovementController } from './money-movement.controller';

@Module({
  controllers: [MoneyMovementController],
  providers: [MoneyMovementService],
})
export class MoneyMovementModule {}
