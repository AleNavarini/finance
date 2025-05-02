import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from 'src/assets/entities/asset.entity';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const asset = await this.assetRepository.findOne({
      where: {
        id: createOrderDto.assetId,
      },
    });

    if (!asset) {
      throw new NotFoundException(`Asset not found`);
    }
    const data = { ...createOrderDto, asset };
    const createdOrder = this.orderRepository.create(data);
    return await this.orderRepository.save(createdOrder);
  }

  async findAll() {
    return await this.orderRepository.find();
  }

  async findOne(id: number) {
    return await this.orderRepository.findOne({ where: { id } });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const asset = await this.assetRepository.findOne({
      where: {
        id: updateOrderDto.assetId,
      },
    });
    if (!asset) throw new Error('Asset not found');

    const data = { ...(updateOrderDto ?? null), asset };
    return await this.orderRepository.update(id, data);
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
