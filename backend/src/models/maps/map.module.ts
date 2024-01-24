import { Module, forwardRef } from '@nestjs/common';
import { MapController } from './map.controller';
import { MapService } from './map.service';
import { AppGatewayModule } from '../gateway/app.gateway.module';
import { MapGateway } from './map.gateway';

@Module({
  imports: [forwardRef(() => AppGatewayModule)],
  controllers: [MapController],
  providers: [MapService, MapGateway],
  exports: [MapService],
})
export class MapModule {}
