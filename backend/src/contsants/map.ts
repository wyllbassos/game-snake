import { Map } from 'src/models/maps/entities/map.entity';
import { Sqm } from 'src/models/maps/entities/sqm.entity';

export const map: Map = new Map();

const addSqm = (): Sqm => {
  let newId = 0;
  const sqm = new Sqm();

  if (map.sqms.length) {
    map.sqms.sort((pa, pb) => pa.id - pb.id);
    newId = map.sqms[map.sqms.length - 1].id + 1;
  }

  sqm.id = newId;
  return sqm;
};

for (let indexY = 0; indexY < map.height; indexY++) {
  for (let indexX = 0; indexX < map.width; indexX++) {
    const sqm = addSqm();
    sqm.posX = indexX;
    sqm.posY = indexY;
    map.sqms.push(sqm);
  }
}
