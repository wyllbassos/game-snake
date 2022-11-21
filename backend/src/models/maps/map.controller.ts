import { Body, Controller, Get, Patch } from '@nestjs/common';
import { Map, Size } from './entities/map.entity';
import { MapService } from './map.service';

@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get()
  getMap(): Map {
    return this.mapService.getMap();
  }

  @Patch('size')
  setMapSize(@Body() size: Size): void {
    this.mapService.setMapSize(size);
  }
}
