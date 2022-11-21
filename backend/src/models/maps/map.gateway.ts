import {
  MessageBody,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { map } from 'src/contsants/map';
import { Map } from './entities/map.entity';

// https://github.com/mguay22/nestjs-sockets/blob/master/socket-client/index.html
// https://www.youtube.com/watch?v=7xpLYk4q0Sg

@WebSocketGateway({ cors: true })
export class MapGateway {
  constructor() {
    // server-side
    const connection = () => {
      this.server.on('connection', (socket) => {
        this.sendNewMap(map);
      });
    };

    try {
      connection();
    } catch (error) {
      setTimeout(connection, 100);
    }
  }

  @WebSocketServer()
  server: Server;

  sendNewMap(@MessageBody() map: Map): void {
    this.server.emit('map', map);
  }
}
