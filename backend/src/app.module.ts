import { Module, forwardRef } from '@nestjs/common';
import { MapModule } from './models/maps/map.module';
import { PlayerModule } from './models/players/player.module';
import { AppGatewayModule } from './models/gateway/app.gateway.module';

@Module({
  imports: [
    forwardRef(() => AppGatewayModule),
    forwardRef(() => MapModule),
    forwardRef(() => PlayerModule),
  ],
})
// @Module({
//   imports: [MapModule, PlayerModule, AppGatewayModule],
// })
export class AppModule {}
