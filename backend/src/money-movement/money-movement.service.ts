import { Injectable } from '@nestjs/common';
import { CreateMoneyMovementDto } from './dto/create-money-movement.dto';
import { UpdateMoneyMovementDto } from './dto/update-money-movement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoneyMovement } from './entities/money-movement.entity';

@Injectable()
export class MoneyMovementService {
  constructor(
    @InjectRepository(MoneyMovement)
    private readonly moneyMovementRepository: Repository<MoneyMovement>,
  ) {}
  async create(createMoneyMovementDto: CreateMoneyMovementDto) {
    const moneyMovement = this.moneyMovementRepository.create(
      createMoneyMovementDto,
    );
    return await this.moneyMovementRepository.save(moneyMovement);
  }

  async findAll() {
    return await this.moneyMovementRepository.find();
  }

  async findOne(id: number) {
    return await this.moneyMovementRepository.findOne({ where: { id } });
  }

  async update(id: number, updateMoneyMovementDto: UpdateMoneyMovementDto) {
    const updateResult = await this.moneyMovementRepository.update(
      id,
      updateMoneyMovementDto,
    );
    return `${updateResult.affected} moneyMovement updated`;
  }

  async remove(id: number) {
    const deleteResult = await this.moneyMovementRepository.delete(id);
    return `${deleteResult.affected} moneyMovement deleted`;
  }
}
