import { Module } from '@nestjs/common';
import { MapGateway } from '../maps/map.gateway';
import { MapModule } from '../maps/map.module';
import { MapService } from '../maps/map.service';
import { PlayerController } from './player.controller';
import { PlayerGateway } from './player.gateway';
import { PlayerService } from './player.service';

@Module({
  imports: [MapModule],
  controllers: [PlayerController],
  providers: [PlayerService, PlayerGateway],
})
export class PlayerModule {}
