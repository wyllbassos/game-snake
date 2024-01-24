import { Module, forwardRef } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { PlayerModule } from '../players/player.module';
import { PlayerService } from '../players/player.service';

@Module({
  imports: [forwardRef(() => PlayerModule)],
  providers: [AppGateway],
  exports: [AppGateway],
})
export class AppGatewayModule {}
