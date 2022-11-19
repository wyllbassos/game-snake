import { Injectable } from '@nestjs/common';
import { players } from 'src/contsants/players';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayerService {
  getAllPlayers(): Player[] {
    return players;
  }

  getPlayer(id: number): Player {
    let player = players.find((p) => p.id === id);
    if (!player) {
      player = this.addPlayer(id);
    }

    return player;
  }

  addPlayer(id: number): Player {
    const player = new Player();
    player.id = id;
    players.push(player);
    return player;
  }
}
