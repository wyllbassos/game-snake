import { Module } from '@nestjs/common';
import { MapController } from './map.controller';
import { MapService } from './map.service';
import { SqmService } from './sqm.service';

@Module({
  imports: [],
  controllers: [MapController],
  providers: [MapService, SqmService],
})
export class MapModule {}
