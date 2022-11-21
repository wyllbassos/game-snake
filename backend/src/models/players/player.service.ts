import { Injectable } from '@nestjs/common';
import { players } from 'src/contsants/players';
import { MapService } from '../maps/map.service';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayerService {
  constructor(private readonly mapService: MapService) {}

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

    if (this.mapService.addContentAtNextSqm(newPlayer)) {
      players.push(newPlayer);
    }

    return newPlayer;
  }
}
