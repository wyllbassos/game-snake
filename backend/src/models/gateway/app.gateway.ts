import { Socket, Server } from 'socket.io';
import { Inject, Logger, forwardRef } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { PlayerGateway } from '../players/player.gateway';
import { PlayerService } from '../players/player.service';
import { Player } from '../players/entities/player.entity';

@WebSocketGateway(8081, { cors: { origin: '*' } })
export class AppGateway implements OnGatewayInit, OnGatewayConnection {
  private logger: Logger = new Logger('AppGateWay');

  constructor(
    @Inject(forwardRef(() => PlayerService))
    private readonly playerService: PlayerService,
  ) {}

  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`client connecter ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`client disconnected ${client.id}`);
    this.playerService.removePlayer(client.id);
  }

  @SubscribeMessage(PlayerGateway.messageAddPlayer)
  addNewPlayer(@MessageBody() player: Player): void {
    this.playerService.addPlayer(player);
  }
}
