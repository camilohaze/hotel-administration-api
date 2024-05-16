import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { GuestEntity } from '@entities';

/**
 * Guest services.
 *
 * @export
 * @class GuestService
 */
@Injectable()
export class GuestService {
  /**
   * Creates an instance of GuestService.
   *
   * @param {Repository<GuestModel>} guestRepository
   * @memberof GuestService
   */
  public constructor(
    @InjectRepository(GuestEntity)
    private readonly guestRepository: Repository<GuestEntity>,
  ) {}

  public async getAll(): Promise<GuestEntity[]> {
    return await this.guestRepository.find();
  }

  public async getById(id: number): Promise<GuestEntity> {
    return await this.guestRepository.findOne({ where: { id } });
  }

  public async store(guest: GuestEntity): Promise<GuestEntity> {
    return await this.guestRepository.save(guest);
  }

  public async update(guest: GuestEntity): Promise<GuestEntity> {
    return await this.guestRepository.save(guest);
  }

  public async destroy(guest: GuestEntity): Promise<GuestEntity> {
    return await this.guestRepository.remove(guest);
  }
}
