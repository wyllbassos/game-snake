import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Map } from './models/maps/entities/map.entity';

// https://github.com/mguay22/nestjs-sockets/blob/master/socket-client/index.html
// https://www.youtube.com/watch?v=7xpLYk4q0Sg

@WebSocketGateway({ cors: true })
export class MapGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('map')
  sendNewMap(@MessageBody() map: Map): void {
    console.log('map', map);
    this.server.emit('map', map);
  }
}
