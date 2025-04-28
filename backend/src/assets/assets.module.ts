import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';
import { BondarapiModule } from 'src/bondarapi/bondarapi.module';

@Module({
  imports: [TypeOrmModule.forFeature([Asset]), BondarapiModule],
  controllers: [AssetsController],
  providers: [AssetsService],
})
export class AssetsModule {}
