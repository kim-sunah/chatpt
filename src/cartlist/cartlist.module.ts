import { Module } from '@nestjs/common';
import { CartlistController } from './cartlist.controller';
import { CartlistService } from './cartlist.service';

@Module({
  controllers: [CartlistController],
  providers: [CartlistService]
})
export class CartlistModule {}
