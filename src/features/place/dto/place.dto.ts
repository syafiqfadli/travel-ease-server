import { LocationDto } from './location.dto';
import { PriceDto } from './price.dto';

export class PlaceDto {
  placeId: string;
  placeName: string;
  prices: PriceDto[];
  location: LocationDto;
}
