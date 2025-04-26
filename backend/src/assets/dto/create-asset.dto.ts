import { AssetType } from '../entities/asset.entity';

export class CreateAssetDto {
  ticker: string;
  type: AssetType;
}
