import { Injectable } from '@nestjs/common';
import { Response } from './core/response/response.entity';

@Injectable()
export class AppService {
  app(): any {
    const data = {
      appName: 'Travel Ease Server',
      author: 'SF Comp Tech',
    };

    return Response.dataResponse(data);
  }
}
