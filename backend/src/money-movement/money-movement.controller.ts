import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MoneyMovementService } from './money-movement.service';
import { CreateMoneyMovementDto } from './dto/create-money-movement.dto';
import { UpdateMoneyMovementDto } from './dto/update-money-movement.dto';

@Controller('money-movement')
export class MoneyMovementController {
  constructor(private readonly moneyMovementService: MoneyMovementService) {}

  @Post()
  create(@Body() createMoneyMovementDto: CreateMoneyMovementDto) {
    return this.moneyMovementService.create(createMoneyMovementDto);
  }

  @Get()
  findAll() {
    return this.moneyMovementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moneyMovementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMoneyMovementDto: UpdateMoneyMovementDto) {
    return this.moneyMovementService.update(+id, updateMoneyMovementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moneyMovementService.remove(+id);
  }
}
