import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomService } from '@services';
import { RoomEntity } from '@entities';
import { ConfigModule } from '@modules';

import { RoomController } from './controllers/room.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity]), ConfigModule],
  providers: [RoomService],
  controllers: [RoomController],
})
export class RoomModule {}
