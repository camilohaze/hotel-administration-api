import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GuestService } from '@services';
import { GuestEntity } from '@entities';
import { ConfigModule } from '@modules';

import { GuestController } from './controllers/guest.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GuestEntity]), ConfigModule],
  providers: [GuestService],
  controllers: [GuestController],
})
export class GuestModule {}
