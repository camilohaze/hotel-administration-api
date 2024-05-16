import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CityEntity } from '@entities';

/**
 * City services.
 *
 * @export
 * @class CityService
 */
@Injectable()
export class CityService {
  /**
   * Creates an instance of CityService.
   *
   * @param {Repository<CityModel>} hotelRepository
   * @memberof CityService
   */
  public constructor(
    @InjectRepository(CityEntity)
    private readonly hotelRepository: Repository<CityEntity>,
  ) {}

  public async getAll(): Promise<CityEntity[]> {
    return await this.hotelRepository.find();
  }

  public async getById(id: number): Promise<CityEntity> {
    return await this.hotelRepository.findOne({
      where: { id },
    });
  }

  public async store(hotel: CityEntity): Promise<CityEntity> {
    return await this.hotelRepository.save(hotel);
  }

  public async update(hotel: CityEntity): Promise<CityEntity> {
    return await this.hotelRepository.save(hotel);
  }

  public async destroy(hotel: CityEntity): Promise<CityEntity> {
    return await this.hotelRepository.remove(hotel);
  }
}
