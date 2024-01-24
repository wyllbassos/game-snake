import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { players } from 'src/contsants/players';
import { MapService } from '../maps/map.service';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayerService {
  constructor(
    @Inject(forwardRef(() => MapService))
    private readonly mapService: MapService,
  ) {}

  getAllPlayers(): Player[] {
    return players;
  }

  getPlayer(id: number): Player {
    return players.find((p) => p.id === id);
  }

  addPlayer(newPlayer: Player): Player {
    const newColor = `#${Math.round(Math.random() * 16777215).toString(16)}`;
    let newId = 0;

    if (players.length) {
      players.sort((pa, pb) => pa.id - pb.id);
      newId = players[players.length - 1].id + 1;
    }

    newPlayer.id = newId;
    newPlayer.color = newColor;

    if (this.mapService.addContentAtNextSqm(newPlayer)) {
      players.push(newPlayer);
      console.log('AddPlayer:', newPlayer);
    }

    return newPlayer;
  }

  removePlayer(socketId: string) {
    const index = players.findIndex((p) => p.socketId === socketId);
    if (index >= 0) {
      const deleted = players.splice(index);
      if (deleted.length > 0) {
        const { posX, posY } = deleted[0];
        console.log('DeletePlayer:', deleted[0]);
        this.mapService.removeContent({ posX, posY });
      }
    }
  }
}
