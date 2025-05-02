import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { OrderType } from '../entities/order.entity';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  assetId?: number;
  price?: number;
  type?: OrderType;
  quantity?: number;
}
