import { Module } from '@nestjs/common';
import { MapGateway } from 'src/map.gateway';
import { MapController } from './map.controller';
import { MapService } from './map.service';

@Module({
  imports: [],
  controllers: [MapController],
  providers: [MapService, MapGateway],
})
export class MapModule {}
