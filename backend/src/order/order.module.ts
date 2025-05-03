import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { AssetsModule } from 'src/assets/assets.module';
import { PortfolioModule } from 'src/portfolio/portfolio.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), AssetsModule, PortfolioModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
