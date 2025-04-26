import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from './entities/asset.entity';
import yahooFinance from 'yahoo-finance2';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset) private assetRepository: Repository<Asset>,
  ) {}

  async create(createAssetDto: CreateAssetDto) {
    // Validate ticker with Yahoo Finance
    let found = false;
    const quote = await yahooFinance.quote(createAssetDto.ticker);
    console.log(quote);
    if (!quote || !quote.symbol) {
      found = false;
    }

    if (!found) {
      throw new NotFoundException(`Ticker ${createAssetDto.ticker} not found `);
    }

    const asset = this.assetRepository.create(createAssetDto);
    const savedAsset = await this.assetRepository.save(asset);
    return savedAsset;
  }

  async findAll() {
    return await this.assetRepository.find();
  }

  async findOne(id: number) {
    return await this.assetRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAssetDto: UpdateAssetDto) {
    const result = await this.assetRepository.update(id, updateAssetDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Asset with id ${id} not found`);
    }
    return `${result.affected} asset updated`;
  }

  async remove(id: number) {
    const result = await this.assetRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Asset with id ${id} not found`);
    }
    return `${result.affected} asset removed`;
  }
}
