import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { HotelEntity, RoomEntity } from '@entities';

/**
 * Hotel services.
 *
 * @export
 * @class HotelService
 */
@Injectable()
export class HotelService {
  /**
   * Creates an instance of HotelService.
   *
   * @param {Repository<HotelModel>} hotelRepository
   * @memberof HotelService
   */
  public constructor(
    @InjectRepository(HotelEntity)
    private readonly hotelRepository: Repository<HotelEntity>,
    @InjectRepository(RoomEntity)
    private readonly roomEntity: Repository<RoomEntity>,
  ) {}

  public async getAll(): Promise<HotelEntity[]> {
    return await this.hotelRepository.find();
  }

  public async getById(id: number): Promise<HotelEntity> {
    return await this.hotelRepository.findOne({
      where: { id },
      relations: ['rooms'],
    });
  }

  public async store(hotel: HotelEntity): Promise<HotelEntity> {
    let rooms = [...hotel.rooms];
    delete hotel.rooms;

    const { id } = await this.hotelRepository.save(hotel);

    rooms = rooms.map((room) => {
      room.hotelId = id;

      return room;
    });

    await this.roomEntity.save(rooms);

    return await this.getById(id);
  }

  public async update(hotel: HotelEntity): Promise<HotelEntity> {
    const rooms = [...hotel.rooms];
    delete hotel.rooms;

    const { id } = await this.hotelRepository.save(hotel);

    await this.roomEntity.save(rooms);

    return this.getById(id);
  }

  public async destroy(hotel: HotelEntity): Promise<HotelEntity> {
    return await this.hotelRepository.remove(hotel);
  }
}
