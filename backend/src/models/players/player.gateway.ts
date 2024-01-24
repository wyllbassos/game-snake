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
import { AppGateway } from '../gateway/app.gateway';
import { Inject, forwardRef } from '@nestjs/common';

// https://github.com/mguay22/nestjs-sockets/blob/master/socket-client/index.html
// https://www.youtube.com/watch?v=7xpLYk4q0Sg

export class PlayerGateway {
  constructor(
    private readonly playerService: PlayerService,
    @Inject(forwardRef(() => AppGateway))
    private readonly appGatway: AppGateway,
  ) {
    appGatway.server.on('addNewPlayer', (e) => {
      console.log(e);
    });
  }

  static messageAddPlayer = 'addNewPlayer';
}
