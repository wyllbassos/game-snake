import { Module } from '@nestjs/common';
import { MapGateway } from './map.gateway';
import { MapModule } from './models/maps/map.module';
import { PlayerModule } from './models/players/player.module';

@Module({
  imports: [MapModule, PlayerModule, MapGateway],
  providers: [],
})
export class AppModule {}
