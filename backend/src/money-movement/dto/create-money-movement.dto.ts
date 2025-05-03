import { MovementType } from '../entities/money-movement.entity';

export class CreateMoneyMovementDto {
  type: MovementType;
  date: Date;
  amountArs: number;
  amountUsd: number;
}
