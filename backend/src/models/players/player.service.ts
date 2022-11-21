import { Injectable } from '@nestjs/common';
import { players } from 'src/contsants/players';
import { MapGateway } from 'src/map.gateway';
import { MapService } from '../maps/map.service';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayerService {
  constructor(
    private readonly apGateway: MapGateway,
    private readonly mapService: MapService,
  ) {}

  getAllPlayers(): Player[] {
    return players;
  }

  getPlayer(id: number): Player {
    return players.find((p) => p.id === id);
  }

  addPlayer(newPlayer: Player): Player {
    let newId = 0;

    if (players.length) {
      players.sort((pa, pb) => pa.id - pb.id);
      newId = players[players.length - 1].id + 1;
    }

    newPlayer.id = newId;
    newPlayer.posX = 0;
    newPlayer.posY = 0;

    players.push(newPlayer);

    this.apGateway.sendNewMap(this.mapService.getMap());

    return newPlayer;
  }
}
