import { Module } from '@nestjs/common';
import { LivecastController } from './livecast.controller';
import { LivecastService } from './livecast.service';

@Module({
  controllers: [LivecastController],
  providers: [LivecastService]
})
export class LivecastModule {}
