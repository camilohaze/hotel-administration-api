import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { BookingEntity, GuestEntity } from '@entities';

/**
 * Booking services.
 *
 * @export
 * @class BookingService
 */
@Injectable()
export class BookingService {
  /**
   * Creates an instance of BookingService.
   *
   * @param {Repository<BookingModel>} bookingRepository
   * @memberof BookingService
   */
  public constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
    @InjectRepository(GuestEntity)
    private readonly guestRepository: Repository<GuestEntity>,
  ) {}

  public async getAll(): Promise<BookingEntity[]> {
    return await this.bookingRepository.find({
      relations: ['hotel', 'room', 'guests'],
    });
  }

  public async getById(id: number): Promise<BookingEntity> {
    return await this.bookingRepository.findOne({
      where: { id },
      relations: [
        'hotel',
        'room',
        'room.roomType',
        'guests',
        'guests.documentType',
        'guests.gender',
      ],
    });
  }

  public async getByHotelId(hotelId: number): Promise<BookingEntity[]> {
    return await this.bookingRepository.find({ where: { hotelId } });
  }

  public async store(booking: BookingEntity): Promise<BookingEntity> {
    let guests = [...booking.guests];
    delete booking.guests;

    const { id } = await this.bookingRepository.save(booking);

    guests = guests.map((guest) => {
      guest.bookingId = id;

      return guest;
    });

    await this.guestRepository.save(guests);

    return await this.getById(id);
  }

  public async update(booking: BookingEntity): Promise<BookingEntity> {
    return await this.bookingRepository.save(booking);
  }

  public async destroy(booking: BookingEntity): Promise<BookingEntity> {
    return await this.bookingRepository.remove(booking);
  }
}
