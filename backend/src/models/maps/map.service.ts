import { Injectable } from '@nestjs/common';
import { map } from 'src/contsants/map';
import { Player } from '../players/entities/player.entity';
import { Map, Size } from './entities/map.entity';
import { Sqm } from './entities/sqm.entity';
import { MapGateway } from './map.gateway';

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
  addContentAtNextSqm(player: Player): boolean {
    const sqm = this.findNextSqmFree();

    if (sqm) {
      sqm.content = player;

      player.posX = sqm.posX;

      player.posY = sqm.posY;

      this.mapGateway.sendNewMap(map);
      return true;
    }

    return false;
  }

  findNextSqmFree(): Sqm {
    for (let posY = 0; posY < map.height; posY++) {
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
