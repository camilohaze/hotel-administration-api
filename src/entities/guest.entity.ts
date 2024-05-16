import { Injectable } from '@nestjs/common';
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { GenderEntity } from './gender.entity';
import { DocumentTypeEntity } from './document-type.entity';
import { BookingEntity } from './booking.entity';

/**
 * Guest entity.
 *
 * @export
 * @class GuestEntity
 */
@Entity('guests')
@Injectable()
export class GuestEntity {
  @PrimaryColumn({ generated: 'increment', nullable: false, unique: true })
  public id?: number;

  @Column('varchar')
  public firstName?: string;

  @Column('varchar')
  public lastName?: string;

  @Column('int')
  public genderId?: string;

  @ManyToOne(() => GenderEntity, (hotel) => hotel.id)
  @JoinColumn({
    name: 'genderId',
    foreignKeyConstraintName: 'FK_GuestsToGenders',
  })
  public gender?: GenderEntity;

  @Column('int')
  public documentTypeId?: string;

  @ManyToOne(() => DocumentTypeEntity, (hotel) => hotel.id)
  @JoinColumn({
    name: 'documentTypeId',
    foreignKeyConstraintName: 'FK_GuestsToDocumentTypes',
  })
  public documentType?: DocumentTypeEntity;

  @Column('varchar')
  public document?: string;

  @Column('varchar')
  public email?: string;

  @Column('varchar')
  public phone?: string;

  @Column('int')
  public bookingId?: number;

  @ManyToOne(() => BookingEntity, (hotel) => hotel.id)
  @JoinColumn({
    name: 'bookingId',
    foreignKeyConstraintName: 'FK_GuestsToBookings',
  })
  public booking?: BookingEntity;

  @Exclude()
  @CreateDateColumn({ readonly: true })
  public createdAt?: Date;

  @Exclude()
  @UpdateDateColumn({ readonly: true })
  public updatedAt?: Date;
}
