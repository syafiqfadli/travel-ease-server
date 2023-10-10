import { Controller, Post, Body, Get, Query, Delete } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceDto } from './dto/place.dto';
import { PriceDto } from './dto/price.dto';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get('google')
  async getGooglePlace(@Query('query') placeQuery: string) {
    return await this.placeService.getGooglePlace(placeQuery);
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

  @Post('update')
  async updatePlace(@Body() place: PlaceDto) {
    return await this.placeService.updatePlace(place);
  }

  @Delete('delete')
  async deletePlace(@Body() body: any) {
    return await this.placeService.deletePlace(body);
  }
}
