import { Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

@Module({
  imports: [],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
