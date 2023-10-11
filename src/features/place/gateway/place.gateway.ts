import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PlaceService } from '../place.service';
import { PlaceDto } from '../dto/place.dto';

@WebSocketGateway({ cors: true })
export class PlaceGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly placeService: PlaceService) {}

  private logger: Logger = new Logger('PlaceGateway');

  @WebSocketServer() wss: Server;

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client Connected: ${client.id}`);
  }

  async getPlaces(): Promise<void> {
    const response = await this.placeService.getPlaceList();
    this.wss.emit('getPlaces', response['data']);
  }

  @SubscribeMessage('createPlace')
  async createPlace(@MessageBody() place: PlaceDto): Promise<void> {
    const response = await this.placeService.createPlace(place);
    this.wss.emit('getStatus', response['message']);

    this.getPlaces();
  }

  @SubscribeMessage('deletePlace')
  async deletePlace(@MessageBody() placeId: string): Promise<void> {
    const body = {
      placeId: placeId,
    };

    const response = await this.placeService.deletePlace(body);
    this.wss.emit('getStatus', response['message']);

    this.getPlaces();
  }

  @SubscribeMessage('updatePlace')
  async updatePlace(@MessageBody() place: PlaceDto): Promise<void> {
    const response = await this.placeService.updatePlace(place);
    this.wss.emit('getStatus', response['message']);

    this.getPlaces();
  }
}
