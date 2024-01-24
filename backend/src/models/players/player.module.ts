import { Module, forwardRef } from '@nestjs/common';
import { MapModule } from '../maps/map.module';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { AppGatewayModule } from '../gateway/app.gateway.module';

@Module({
  imports: [forwardRef(() => MapModule), forwardRef(() => AppGatewayModule)],
  controllers: [PlayerController],
  providers: [PlayerService],
  exports: [PlayerService],
})
export class PlayerModule {}
