import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { map } from 'src/contsants/map';
import { Player } from './entities/player.entity';
import { PlayerService } from './player.service';

// https://github.com/mguay22/nestjs-sockets/blob/master/socket-client/index.html
// https://www.youtube.com/watch?v=7xpLYk4q0Sg

@WebSocketGateway({ cors: true })
export class PlayerGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly playerService: PlayerService) {
    // server-side
    const connection = () => {
      this.server.on('connection', (socket) => {
        console.log(socket.id); // x8WIv7-mJelg7on_ALbx
      });

      this.server.on('disconnect', (a) => {
        console.log(a); // undefined
      });
    };

    try {
      connection();
    } catch (error) {
      setTimeout(connection, 100);
    }
  }

  @SubscribeMessage('addNewPlayer')
  addNewPlayer(@MessageBody() player: Player): void {
    this.playerService.addPlayer(player);
  }
}
