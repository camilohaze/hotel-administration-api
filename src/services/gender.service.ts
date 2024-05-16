import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { GenderEntity } from '@entities';

/**
 * Gender services.
 *
 * @export
 * @class GenderService
 */
@Injectable()
export class GenderService {
  /**
   * Creates an instance of GenderService.
   *
   * @param {Repository<GenderModel>} hotelRepository
   * @memberof GenderService
   */
  public constructor(
    @InjectRepository(GenderEntity)
    private readonly hotelRepository: Repository<GenderEntity>,
  ) {}

  public async getAll(): Promise<GenderEntity[]> {
    return await this.hotelRepository.find();
  }

  public async getById(id: number): Promise<GenderEntity> {
    return await this.hotelRepository.findOne({
      where: { id },
    });
  }

  public async store(hotel: GenderEntity): Promise<GenderEntity> {
    return await this.hotelRepository.save(hotel);
  }

  public async update(hotel: GenderEntity): Promise<GenderEntity> {
    return await this.hotelRepository.save(hotel);
  }

  public async destroy(hotel: GenderEntity): Promise<GenderEntity> {
    return await this.hotelRepository.remove(hotel);
  }
}
