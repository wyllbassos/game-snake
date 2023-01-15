import { Module } from '@nestjs/common';
import { PlayerService } from '../players/player.service';
import { MapController } from './map.controller';
import { MapGateway } from './map.gateway';
import { MapService } from './map.service';

@Module({
  imports: [],
  controllers: [MapController],
  providers: [MapService, MapGateway],
  exports: [MapService],
})
export class MapModule {}
