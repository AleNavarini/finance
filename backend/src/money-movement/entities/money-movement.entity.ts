import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum MovementType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
}
@Entity()
export class MoneyMovement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: MovementType })
  type: MovementType;

  @Column()
  date: Date;

  @Column()
  amountArs: number;

  @Column()
  amountUsd: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
