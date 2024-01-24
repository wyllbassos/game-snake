import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { map } from 'src/contsants/map';
import { Player } from '../players/entities/player.entity';
import { Map, Size } from './entities/map.entity';
import { Sqm } from './entities/sqm.entity';
import { AppGateway } from '../gateway/app.gateway';
import { MapGateway } from './map.gateway';

interface Pos {
  posX: number;
  posY: number;
}

@Injectable()
export class MapService {
  constructor(
    @Inject(forwardRef(() => MapGateway))
    private readonly mapGateway: MapGateway,
  ) {}

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
      console.log('Alter SQM:', sqm);
      player.posX = sqm.posX;

      player.posY = sqm.posY;

      this.mapGateway.sendNewMap(map);
      return true;
    }

    return false;
  }

  removeContent({ posX, posY }) {
    const sqm = this.findSqm({ posX, posY });
    sqm.content = null;
    console.log('Alter SQM:', sqm);
    this.mapGateway.sendNewMap(map);
  }

  findNextSqmFree(): Sqm {
    return map.sqms.find((sqm) => !sqm?.content);
  }

  findSqm({ posX, posY }): Sqm {
    return map.sqms.find((sqm) => sqm.posX === posX && sqm.posY === posY);
  }
}
