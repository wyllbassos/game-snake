import { MessageBody } from '@nestjs/websockets';
import { AppGateway } from '../gateway/app.gateway';
import { Map } from './entities/map.entity';
import { Inject, forwardRef } from '@nestjs/common';

// https://github.com/mguay22/nestjs-sockets/blob/master/socket-client/index.html
// https://www.youtube.com/watch?v=7xpLYk4q0Sg

export class MapGateway {
  constructor(
    @Inject(forwardRef(() => AppGateway))
    private readonly appGatway: AppGateway,
  ) {}

  sendNewMap(@MessageBody() map: Map): void {
    this.appGatway.server.emit('map', map);
  }
}
