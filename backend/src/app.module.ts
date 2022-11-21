import { Module } from '@nestjs/common';
import { MapModule } from './models/maps/map.module';
import { PlayerModule } from './models/players/player.module';

@Module({
  imports: [MapModule, PlayerModule],
  providers: [],
})
export class AppModule {}
