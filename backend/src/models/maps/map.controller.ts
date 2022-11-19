import { Controller, Get } from '@nestjs/common';
import { Map } from './entities/map.entity';
import { MapService } from './map.service';

@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get()
  getMap(): Map {
    return this.mapService.getMap();
  }
}
