import { Injectable } from '@nestjs/common';
import { map } from 'src/contsants/map';
import { Map, Size } from './entities/map.entity';
import { SqmService } from './sqm.service';

@Injectable()
export class MapService {
  constructor(private readonly sqmService: SqmService) {}

  getMap(): Map {
    map.sqms = this.sqmService.getAllSqm();
    return map;
  }

  setMapSize({ width, height }: Size): void {
    map.width = width;
    map.height = height;
  }
}
