import { Injectable } from '@nestjs/common';
import { map } from 'src/contsants/map';
import { Map } from './entities/map.entity';
import { SqmService } from './sqm.service';

@Injectable()
export class MapService {
  constructor(private readonly sqmService: SqmService) {}

  getMap(): Map {
    map.sqms = this.sqmService.getAllSqm();
    return map;
  }
}
