import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PriceDto } from './dto/price.dto';
import { LocationDto } from './dto/location.dto';

export type PlaceDocument = Place & Document;

@Schema({ versionKey: false, timestamps: true })
export class Place {
  @Prop({ required: true })
  placeId: string;

  @Prop({ required: true })
  placeName: string;

  @Prop({ required: true })
  prices: PriceDto[];

  @Prop({ required: true })
  location: LocationDto;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);
