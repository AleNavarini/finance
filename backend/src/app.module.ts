import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';
import { UsersModule } from './user/users.module';
import { AssetsModule } from './assets/assets.module';
import { BondarapiModule } from './bondarapi/bondarapi.module';
import { MoneyMovementModule } from './money-movement/money-movement.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    UsersModule,
    OrderModule,
    AssetsModule,
    BondarapiModule,
    MoneyMovementModule,
    PortfolioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
