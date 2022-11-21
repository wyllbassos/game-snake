import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { MapGateway } from 'src/map.gateway';
import { Map, Size } from './entities/map.entity';
import { MapService } from './map.service';

@Controller('map')
export class MapController {
  constructor(
    private readonly mapService: MapService,
    private readonly apGateway: MapGateway,
  ) {}

  @Get()
  getMap(): Map {
    return this.mapService.getMap();
  }

  @Patch('size')
  setMapSize(@Body() size: Size): void {
    this.mapService.setMapSize(size);
  }
}
