import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomTypeService } from '@services';
import { RoomTypeEntity } from '@entities';
import { ConfigModule } from '@modules';

import { RoomTypeController } from './controllers/room-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RoomTypeEntity]), ConfigModule],
  providers: [RoomTypeService],
  controllers: [RoomTypeController],
})
export class RoomTypeModule {}
