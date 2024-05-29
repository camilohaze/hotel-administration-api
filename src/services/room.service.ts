import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, LessThanOrEqual, MoreThanOrEqual, Between } from 'typeorm';

import { RoomsFilter } from '@interfaces';
import { RoomEntity } from '@entities';

/**
 * Room services.
 *
 * @export
 * @class RoomService
 */
@Injectable()
export class RoomService {
  /**
   * Creates an instance of RoomService.
   *
   * @param {Repository<RoomModel>} roomRepository
   * @memberof RoomService
   */
  public constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
  ) {}

  public async getById(id: number): Promise<RoomEntity> {
    return await this.roomRepository.findOne({ where: { id } });
  }

  public async getByHotelId(hotelId: number): Promise<RoomEntity[]> {
    return await this.roomRepository.find({ where: { hotelId } });
  }

  public async filter(options: RoomsFilter): Promise<RoomEntity[]> {
    const { cityId, passengers } = options;

    return await this.roomRepository.find({
      where: [
        {
          hotel: {
            cityId,
            status: true,
          },
          roomType: [
            {
              minimum: Between(passengers, passengers),
            },
            {
              maximum: Between(passengers, passengers),
            },
            {
              minimum: LessThanOrEqual(passengers),
              maximum: MoreThanOrEqual(passengers),
            },
          ],
          busy: false,
          status: true,
        },
      ],
      order: {
        hotel: {
          id: 'ASC',
        },
      },
      relations: ['roomType', 'hotel'],
    });
  }

  public async store(rooms: RoomEntity[]): Promise<RoomEntity[]> {
    return await this.roomRepository.save(rooms);
  }

  public async update(room: RoomEntity[]): Promise<RoomEntity[]> {
    return await this.roomRepository.save(room);
  }

  public async destroy(room: RoomEntity): Promise<RoomEntity> {
    return await this.roomRepository.remove(room);
  }
}
