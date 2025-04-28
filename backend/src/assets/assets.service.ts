import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from './entities/asset.entity';
import yahooFinance from 'yahoo-finance2';
import { Quote } from 'yahoo-finance2/dist/esm/src/modules/quote';
import { BondarapiService } from 'src/bondarapi/bondarapi.service';
import { BondData } from 'src/bondarapi/bondData';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset) private assetRepository: Repository<Asset>,
    private readonly bondarapiService: BondarapiService,
  ) {}

  async create(createAssetDto: CreateAssetDto) {
    console.log(`Attempting to validate ticker: ${createAssetDto.ticker}`);

    // Check if asset with this ticker already exists
    const existingAsset = await this.assetRepository.findOne({
      where: { ticker: createAssetDto.ticker },
    });

    if (existingAsset) {
      console.log(`Asset with ticker ${createAssetDto.ticker} already exists`);
      throw new NotFoundException(
        `Asset with ticker ${createAssetDto.ticker} already exists in the database`,
      );
    }

    // Validate ticker with Yahoo Finance
    let found = false;
    let searchable = '';
    let quote: Quote | undefined = undefined;

    if (!createAssetDto.ticker.endsWith('.BA')) {
      searchable = createAssetDto.ticker + '.BA';
      console.log(
        `Ticker doesn't end with .BA, trying to fetch with: ${searchable}`,
      );
      try {
        quote = await yahooFinance.quote(searchable);
        console.log(`Yahoo Finance response for ${searchable}:`, quote);
        if (!quote || !quote.symbol) {
          console.log(`No valid symbol returned for ${searchable}`);
          found = false;
        } else {
          console.log(`Valid symbol found: ${quote.symbol}`);
          found = true;
        }
      } catch (error) {
        console.error(
          `Error fetching ${searchable} from Yahoo Finance:`,
          error,
        );
        found = false;
      }
    } else {
      console.log(`Trying to fetch ticker as-is: ${createAssetDto.ticker}`);
      try {
        quote = await yahooFinance.quote(createAssetDto.ticker);
        console.log(
          `Yahoo Finance response for ${createAssetDto.ticker}:`,
          quote,
        );
        if (!quote || !quote.symbol) {
          console.log(`No valid symbol returned for ${createAssetDto.ticker}`);
          found = false;
        } else {
          console.log(`Valid symbol found: ${quote.symbol}`);
          found = true;
        }
      } catch (error) {
        console.error(
          `Error fetching ${createAssetDto.ticker} from Yahoo Finance:`,
          error,
        );
        found = false;
      }
    }

    if (!found) {
      console.log(
        `Ticker ${createAssetDto.ticker} not found in Yahoo Finance, checking in Bondarapi...`,
      );
      try {
        const result: BondData = await this.bondarapiService.getBondByTicker(
          createAssetDto.ticker,
        );
        console.log(`Bondarapi response for ${createAssetDto.ticker}:`, result);

        if (!result) {
          console.error(
            `Ticker ${createAssetDto.ticker} not found in Bondarapi either`,
          );
          throw new NotFoundException(
            `Ticker ${createAssetDto.ticker} not found in any source`,
          );
        }
        console.log(`Valid bond found in Bondarapi: ${createAssetDto.ticker}`);
        found = true;
      } catch (error) {
        console.error(
          `Error checking Bondarapi for ${createAssetDto.ticker}:`,
          error,
        );
        throw new NotFoundException(
          `Error checking ticker ${createAssetDto.ticker}: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    }

    if (!found) {
      console.error(
        `Ticker ${createAssetDto.ticker} validation failed after all attempts`,
      );
      throw new NotFoundException(
        `Ticker ${createAssetDto.ticker} not found in any source`,
      );
    }

    console.log(`Creating asset with ticker: ${createAssetDto.ticker}`);
    const asset = this.assetRepository.create(createAssetDto);
    const savedAsset = await this.assetRepository.save(asset);
    console.log(`Asset created successfully with ID: ${savedAsset.id}`);
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
