import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Place, PlaceDocument } from './place.schema';
import { Response } from 'src/core/response/response.entity';
import { PlaceDto } from './dto/place.dto';

@Injectable()
export class PlaceService {
  constructor(
    @InjectModel(Place.name)
    private readonly placeModel: Model<PlaceDocument>,
  ) {}

  async getPlaceList(): Promise<Response> {
    const places = await this.placeModel.find();

    return Response.dataResponse(places);
  }

  async getPlaceInfo(placeId: string): Promise<Response> {
    if (!placeId) {
      return Response.errorResponse('Please enter place Id.');
    }

    const place = await this.placeModel.findOne({
      placeId: placeId,
    });

    if (!place) {
      return Response.errorResponse('Place not found.');
    }

    return Response.dataResponse(place);
  }

  async createPlace(place: PlaceDto): Promise<Response> {
    if (
      !place.placeId ||
      !place.placeName ||
      !place.location ||
      !place.prices
    ) {
      return Response.errorResponse('Required data is null.');
    }

    const isPlaceFound = await this.placeModel.findOne({
      placeId: place.placeId,
    });

    if (isPlaceFound) {
      return Response.errorResponse('Place is already exist.');
    }

    await new this.placeModel({
      placeId: place.placeId,
      placeName: place.placeName,
      location: place.location,
      prices: place.prices.length === 0 ? [] : place.prices,
    }).save();

    return Response.messageResponse('Place added successfully');
  }

  async updatePlace(place: PlaceDto): Promise<Response> {
    if (!place.placeId || !place.prices) {
      return Response.errorResponse('Required data is null.');
    }

    const isPlaceFound = await this.placeModel.findOneAndUpdate(
      {
        placeId: place.placeId,
      },
      {
        $set: {
          prices: place.prices,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!isPlaceFound) {
      return Response.errorResponse('Place not found.');
    }

    return Response.messageResponse('Place updated successfully');
  }

  async deletePlace(body: any): Promise<Response> {
    const { placeId } = body;

    if (!placeId) {
      return Response.errorResponse('Place Id is required.');
    }

    const place = await this.placeModel.findOneAndDelete({
      placeId: placeId,
    });

    if (!place) {
      return Response.errorResponse('Place not found.');
    }

    return Response.messageResponse('Place successfully deleted.');
  }
}
