import { Injectable } from '@nestjs/common';
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { HotelEntity } from './hotel.entity';
import { RoomEntity } from './room.entity';
import { GuestEntity } from './guest.entity';

/**
 * Booking entity.
 *
 * @export
 * @class BookingEntity
 */
@Entity('bookings')
@Injectable()
export class BookingEntity {
  @PrimaryColumn({ generated: 'increment', nullable: false, unique: true })
  public id?: number;

  @Column('int')
  public hotelId?: number;

  @ManyToOne(() => HotelEntity, (hotel) => hotel.id)
  @JoinColumn({
    name: 'hotelId',
    foreignKeyConstraintName: 'FK_BookingsToHotels',
  })
  public hotel?: HotelEntity;

  @Column('int')
  public roomId?: number;

  @ManyToOne(() => RoomEntity, (room) => room.id)
  @JoinColumn({
    name: 'roomId',
    foreignKeyConstraintName: 'FK_BookingsToRooms',
  })
  public room?: RoomEntity;

  @Column('date')
  public checkin?: string;

  @Column('date')
  public checkout?: string;

  @Column('varchar')
  public fullName?: string;

  @Column('varchar')
  public phone?: string;

  @Column('decimal', { precision: 10, scale: 2 })
  public total?: string;

  @OneToMany(() => GuestEntity, (guest) => guest.booking, {
    cascade: true,
  })
  public guests?: GuestEntity[];

  @Exclude()
  @CreateDateColumn({ readonly: true })
  public createdAt?: Date;

  @Exclude()
  @UpdateDateColumn({ readonly: true })
  public updatedAt?: Date;
}
