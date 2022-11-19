import { Controller, Get, Param } from '@nestjs/common';
import { Player } from './entities/player.entity';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  getAll(): Player[] {
    return this.playerService.getAllPlayers();
  }

  @Get(':id')
  getPlayer(@Param('id') id: string): Player {
    return this.playerService.getPlayer(Number(id));
  }
}
