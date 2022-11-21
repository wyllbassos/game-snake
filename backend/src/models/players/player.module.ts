import { Module } from '@nestjs/common';
import { MapGateway } from 'src/map.gateway';
import { MapService } from '../maps/map.service';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

@Module({
  imports: [],
  controllers: [PlayerController],
  providers: [PlayerService, MapService, MapGateway],
})
export class PlayerModule {}
