import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BondData } from './bondData';

@Injectable()
export class BondarapiService {
  private readonly url: string;

  constructor(private configService: ConfigService) {
    this.url = configService.get('BONDAR_API_URL')!;
  }

  async getBondByTicker(ticker: string): Promise<BondData> {
    try {
      const response = await fetch(`${this.url}bond/${ticker}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch bond data: ${response.statusText}`);
      }
      const data: BondData = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching bond data:', error);
      throw error;
    }
  }
}
