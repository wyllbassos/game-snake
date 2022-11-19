import { Injectable } from '@nestjs/common';
import { map } from 'src/contsants/map';
import { players } from 'src/contsants/players';
import { Size } from './entities/map.entity';
import { Sqm } from './entities/sqm.entity';

interface Pos {
  posX: number;
  posY: number;
}

@Injectable()
export class SqmService {
  getAllSqm(): Sqm[] {
    const sqms: Sqm[] = [];

    players.forEach((player) => {
      const pos = this.findNextPosFree(sqms);

      const newSqm = this.addSqm(sqms);
      newSqm.content = player;

      newSqm.posX = pos.posX;
      player.posX = pos.posX;

      newSqm.posY = pos.posY;
      player.posY = pos.posY;
    });

    return sqms;
  }

  addSqm(sqms: Sqm[]): Sqm {
    let newId = 0;
    const sqm = new Sqm();

    if (sqms.length) {
      sqms.sort((pa, pb) => pa.id - pb.id);
      newId = sqms[sqms.length - 1].id + 1;
    }

    sqm.id = newId;
    sqms.push(sqm);
    return sqm;
  }

  findNextPosFree(sqms: Sqm[]): Pos {
    for (let posY = 0; posY < map.height - 1; posY++) {
      for (let posX = 0; posX < map.width; posX++) {
        const existsSqm = sqms.find(
          (sqm) => sqm.posX === posX && sqm.posY === posY,
        );

        if (!existsSqm) {
          return {
            posX,
            posY,
          };
        }
      }
    }

    return {
      posX: 0,
      posY: 0,
    };
  }
}
