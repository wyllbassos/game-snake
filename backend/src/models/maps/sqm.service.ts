import { Injectable } from '@nestjs/common';
import { players } from 'src/contsants/players';
import { sqms } from 'src/contsants/sqms';
import { Sqm } from './entities/sqm.entity';

@Injectable()
export class SqmService {
  getAllSqm(): Sqm[] {
    const sqms: Sqm[] = [];

    players.forEach((player) => {
      let sqm = sqms.find(
        (sqm) => sqm.posX === player.posX && sqm.posY === player.posY,
      );

      if (!sqm) {
        sqm = this.addSqm(0);
        sqm.content = player;
      } else {
        const posX = sqm.posX + 1;
        sqm = this.addSqm(0);
        sqm.posX = posX;
      }
    });

    return sqms;
  }

  addSqm(id: number): Sqm {
    const sqm = new Sqm();
    sqm.id = id;
    sqms.push(sqm);
    return sqm;
  }
}
