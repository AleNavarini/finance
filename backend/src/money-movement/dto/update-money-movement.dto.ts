import { PartialType } from '@nestjs/swagger';
import { CreateMoneyMovementDto } from './create-money-movement.dto';
import { MovementType } from '../entities/money-movement.entity';

export class UpdateMoneyMovementDto extends PartialType(
  CreateMoneyMovementDto,
) {
  type?: MovementType;
  date?: Date;
  amountArs?: number;
  amountUsd?: number;
}
