import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
