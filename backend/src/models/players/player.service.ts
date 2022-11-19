import { Injectable } from '@nestjs/common';
import { players } from 'src/contsants/players';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayerService {
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
    return newPlayer;
  }
}
