import { Sqm } from './sqm.entity';

export interface Size {
  width: number;
  height: number;
}

export class Map {
  id = 0;
  width = 20;
  height = 20;
  sqms: Sqm[] = [];
}
