import { Asset } from 'src/assets/entities/asset.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Entity,
} from 'typeorm';

export enum OrderType {
  BUY = 'buy',
  SELL = 'sell',
}
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: OrderType;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Asset, (asset) => asset.orders)
  asset: Asset;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
