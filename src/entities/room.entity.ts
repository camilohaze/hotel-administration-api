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

import { HotelEntity } from './hotel.entity';
import { RoomTypeEntity } from './room-types.entity';

/**
 * Room entity.
 *
 * @export
 * @class RoomEntity
 */
@Entity('rooms')
@Injectable()
export class RoomEntity {
  @PrimaryColumn({
    generated: 'increment',
    primaryKeyConstraintName: 'PK_Rooms',
  })
  public id?: number;

  @Column('varchar')
  public number?: string;

  @Column('int')
  public roomTypeId?: number;

  @ManyToOne(() => RoomTypeEntity, (roomType) => roomType.id)
  @JoinColumn({
    name: 'roomTypeId',
    foreignKeyConstraintName: 'FK_RoomsToRoomTypes',
  })
  public roomType?: RoomTypeEntity;

  @Column('int')
  public hotelId?: number;

  @ManyToOne(() => HotelEntity, (hotel) => hotel.id)
  @JoinColumn({ name: 'hotelId', foreignKeyConstraintName: 'FK_RoomsToHotels' })
  public hotel?: HotelEntity;

  @Column('boolean', { default: false })
  public busy?: boolean;

  @Column('boolean', { default: true })
  public status?: boolean;

  @Exclude()
  @CreateDateColumn({ readonly: true })
  public createdAt?: Date;

  @Exclude()
  @UpdateDateColumn({ readonly: true })
  public updatedAt?: Date;
}
