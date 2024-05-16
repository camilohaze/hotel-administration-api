import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HotelService } from '@services';
import { HotelEntity, RoomEntity } from '@entities';
import { ConfigModule } from '@modules';

import { HotelController } from './controllers/hotel.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HotelEntity, RoomEntity]), ConfigModule],
  providers: [HotelService],
  controllers: [HotelController],
})
export class HotelModule {}
