import { Module } from '@nestjs/common';
import { MoneyMovementService } from './money-movement.service';
import { MoneyMovementController } from './money-movement.controller';
import { MoneyMovement } from './entities/money-movement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MoneyMovement])],
  controllers: [MoneyMovementController],
  providers: [MoneyMovementService],
})
export class MoneyMovementModule {}
