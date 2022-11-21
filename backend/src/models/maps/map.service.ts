import { Injectable } from '@nestjs/common';
import { map } from 'src/contsants/map';
import { players } from 'src/contsants/players';
import { MapGateway } from 'src/map.gateway';
import { Player } from '../players/entities/player.entity';
import { Map, Size } from './entities/map.entity';
import { Sqm } from './entities/sqm.entity';

interface Pos {
  posX: number;
  posY: number;
}

@Injectable()
export class MapService {
  constructor(private readonly mapGateway: MapGateway) {}
  getMap(): Map {
    return map;
  }

  setMapSize({ width, height }: Size): void {
    map.width = width;
    map.height = height;

    this.mapGateway.sendNewMap(map);
  }

  //=======================================================
  addContentAtNextSqm(player: Player) {
    const sqm = this.findNextSqmFree();

    if (sqm) {
      sqm.content = player;

      player.posX = sqm.posX;

      player.posY = sqm.posY;

      this.mapGateway.sendNewMap(map);
    }
  }

  findNextSqmFree(): Sqm {
    for (let posY = 0; posY < map.height - 1; posY++) {
      for (let posX = 0; posX < map.width; posX++) {
        const existsSqm = map.sqms.find(
          (sqm) => sqm.posX === posX && sqm.posY === posY,
        );

        if (!existsSqm?.content) {
          return existsSqm;
        }
      }
    }

    return map.sqms[0];
  }
}
