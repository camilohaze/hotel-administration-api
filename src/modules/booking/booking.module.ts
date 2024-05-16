import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookingService } from '@services';
import { BookingEntity, GuestEntity } from '@entities';
import { ConfigModule } from '@modules';

import { BookingController } from './controllers/booking.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingEntity, GuestEntity]),
    ConfigModule,
  ],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule {}
