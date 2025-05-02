import { Order } from 'src/order/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum AssetType {
  EQUITY = 'equity',
  BOND = 'bond',
  CEDEAR = 'cedear',
  LETTER = 'letter',
}

@Entity()
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ticker: string;

  @Column()
  type: AssetType;

  @OneToMany(() => Order, (order) => order.asset)
  orders: Order[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
