import { OrderType } from '../entities/order.entity';

export class CreateOrderDto {
  assetId: number;
  price: number;
  type: OrderType;
  quantity: number;
}
