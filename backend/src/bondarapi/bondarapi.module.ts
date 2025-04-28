import { Module } from '@nestjs/common';
import { BondarapiService } from './bondarapi.service';

@Module({
  providers: [BondarapiService],
  exports: [BondarapiService],
})
export class BondarapiModule {}
