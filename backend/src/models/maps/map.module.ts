import { Module } from '@nestjs/common';
import { MapGateway } from 'src/map.gateway';
import { MapController } from './map.controller';
import { MapService } from './map.service';
import { SqmService } from './sqm.service';

@Module({
  imports: [],
  controllers: [MapController],
  providers: [MapService, MapGateway, SqmService],
})
export class MapModule {}
