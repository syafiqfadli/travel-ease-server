import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response } from 'src/core/response/response.entity';
import { ApiUrl } from 'src/core/utils/constants';
import { PlaceDto } from './dto/place.dto';
import { Place, PlaceDocument } from './place.schema';

@Injectable()
export class PlaceService {
  constructor(
    @InjectModel(Place.name)
    private readonly placeModel: Model<PlaceDocument>,
  ) { }

  async getGooglePlaceText(placeQuery: string): Promise<Response> {
    if (!placeQuery) {
      return Response.errorResponse('Please enter place.');
    }

    try {
      const response = await fetch(
        `${ApiUrl.googleBaseUrl}/place/textsearch/json?key=${process.env.GOOGLE_API_KEY}&query=${placeQuery + ' melaka'}`,
      ).then((data) => {
        return data.json();
      });

      return Response.dataResponse(response);
    } catch (error) {
      return Response.errorResponse(error.toString());
    }
  }

  async getGooglePlaceNearby(type: string, latitude: number, longitude: number): Promise<Response> {
    if (!latitude || !longitude) {
      return Response.errorResponse('Required data is null.');
    }

    try {
      const response = await fetch(
        `${ApiUrl.googleBaseUrl}/place/nearbysearch/json?key=${process.env.GOOGLE_API_KEY}&radius=10000&&type=${type}&location=${latitude}, ${longitude}`,
      ).then((data) => {
        return data.json();
      });

      return Response.dataResponse(response);
    } catch (error) {
      return Response.errorResponse(error.toString());
    }
  }

  async getGooglePlaceDetails(placeId: string): Promise<Response> {
    if (!placeId) {
      return Response.errorResponse('Required data is null.');
    }

    try {
      const response = await fetch(
        `${ApiUrl.googleBaseUrl}/place/details/json?key=${process.env.GOOGLE_API_KEY}&place_id=${placeId}`,
      ).then((data) => {
        return data.json();
      });

      return Response.dataResponse(response);
    } catch (error) {
      return Response.errorResponse(error.toString());
    }
  }

  async getGoogleDirection(origin: string, destination: string): Promise<Response> {
    if (!origin || !destination) {
      return Response.errorResponse('Required data is null.');
    }

    try {
      const response = await fetch(
        `${ApiUrl.googleBaseUrl}/directions/json?key=${process.env.GOOGLE_API_KEY}&origin=${origin}&destination=${destination}`,
      ).then((data) => {
        return data.json();
      });

      return Response.dataResponse(response['routes'][0]['legs'][0]);
    } catch (error) {
      return Response.errorResponse(error.toString());
    }
  }

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
