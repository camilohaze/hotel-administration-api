import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { DocumentTypeEntity } from '@entities';

/**
 * DocumentType services.
 *
 * @export
 * @class DocumentTypeService
 */
@Injectable()
export class DocumentTypeService {
  /**
   * Creates an instance of DocumentTypeService.
   *
   * @param {Repository<DocumentTypeModel>} hotelRepository
   * @memberof DocumentTypeService
   */
  public constructor(
    @InjectRepository(DocumentTypeEntity)
    private readonly hotelRepository: Repository<DocumentTypeEntity>,
  ) {}

  public async getAll(): Promise<DocumentTypeEntity[]> {
    return await this.hotelRepository.find();
  }

  public async getById(id: number): Promise<DocumentTypeEntity> {
    return await this.hotelRepository.findOne({
      where: { id },
    });
  }

  public async store(hotel: DocumentTypeEntity): Promise<DocumentTypeEntity> {
    return await this.hotelRepository.save(hotel);
  }

  public async update(hotel: DocumentTypeEntity): Promise<DocumentTypeEntity> {
    return await this.hotelRepository.save(hotel);
  }

  public async destroy(hotel: DocumentTypeEntity): Promise<DocumentTypeEntity> {
    return await this.hotelRepository.remove(hotel);
  }
}
