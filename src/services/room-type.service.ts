import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { RoomTypeEntity } from '@entities';

/**
 * RoomType services.
 *
 * @export
 * @class RoomTypeService
 */
@Injectable()
export class RoomTypeService {
  /**
   * Creates an instance of RoomTypeService.
   *
   * @param {Repository<RoomTypeModel>} roomTypeRepository
   * @memberof RoomTypeService
   */
  public constructor(
    @InjectRepository(RoomTypeEntity)
    private readonly roomTypeRepository: Repository<RoomTypeEntity>,
  ) {}

  public async getAll(): Promise<RoomTypeEntity[]> {
    return await this.roomTypeRepository.find();
  }

  public async getById(id: number): Promise<RoomTypeEntity> {
    return await this.roomTypeRepository.findOne({ where: { id } });
  }

  public async store(roomType: RoomTypeEntity): Promise<RoomTypeEntity> {
    return await this.roomTypeRepository.save(roomType);
  }

  public async update(roomType: RoomTypeEntity): Promise<RoomTypeEntity> {
    return await this.roomTypeRepository.save(roomType);
  }

  public async destroy(roomType: RoomTypeEntity): Promise<RoomTypeEntity> {
    return await this.roomTypeRepository.remove(roomType);
  }
}
