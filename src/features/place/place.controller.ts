import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { PlaceDto } from './dto/place.dto';
import { PlaceService } from './place.service';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) { }

  @Get('google-text')
  async getGooglePlaceText(@Query('query') placeQuery: string) {
    return await this.placeService.getGooglePlaceText(placeQuery);
  }

  @Get('google-nearby')
  async getGooglePlaceNearby(@Query('type') type: string, @Query('latitude') latitude: number, @Query('longitude') longitude: number) {
    return await this.placeService.getGooglePlaceNearby(type, latitude, longitude);
  }

  @Get('google-details')
  async getGooglePlaceDetails(@Query('placeId') placeId: string) {
    return await this.placeService.getGooglePlaceDetails(placeId);
  }

  @Get('list')
  async getPlaceList() {
    return await this.placeService.getPlaceList();
  }

  @Get('info')
  async getPlaceInfo(@Query('placeId') placeId: string) {
    return await this.placeService.getPlaceInfo(placeId);
  }

  @Post('create')
  async createPlace(@Body() place: PlaceDto) {
    return await this.placeService.createPlace(place);
  }

  @Patch('update')
  async updatePlace(@Body() place: PlaceDto) {
    return await this.placeService.updatePlace(place);
  }

  @Delete('delete')
  async deletePlace(@Body() body: any) {
    return await this.placeService.deletePlace(body);
  }
}
