import { Injectable } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolio } from './entities/portfolio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,
  ) {}
  async create(createPortfolioDto: CreatePortfolioDto) {
    const portfolio = this.portfolioRepository.create({
      ...createPortfolioDto,
      user: { id: createPortfolioDto.userId },
    });
    return await this.portfolioRepository.save(portfolio);
  }

  async findAll() {
    return this.portfolioRepository.find();
  }

  async findOne(id: number) {
    return this.portfolioRepository.findBy({ id });
  }

  async update(id: number, updatePortfolioDto: UpdatePortfolioDto) {
    const updated = await this.portfolioRepository.update(
      id,
      updatePortfolioDto,
    );
    return updated;
  }

  async remove(id: number) {
    return this.portfolioRepository.delete(id);
  }
}
