import { Injectable } from '@nestjs/common';
import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { RoomEntity } from './room.entity';
import { CityEntity } from './city.entity';

/**
 * Hotel entity.
 *
 * @export
 * @class HotelEntity
 */
@Entity('hotels')
@Injectable()
export class HotelEntity {
  @PrimaryColumn({ generated: 'increment', nullable: false, unique: true })
  public id?: number;

  @Column('varchar')
  public name?: string;

  @Column('varchar')
  public address?: string;

  @Column('varchar')
  public phone?: string;

  @Column('varchar')
  public email?: string;

  @Column('int')
  public cityId?: number;

  @ManyToOne(() => CityEntity, (city) => city.id)
  @JoinColumn({
    name: 'cityId',
    foreignKeyConstraintName: 'FK_HotelsToCities',
  })
  public city?: CityEntity;

  @Column('boolean', { default: true })
  public status?: boolean;

  @OneToMany(() => RoomEntity, (room) => room.hotel, {
    cascade: true,
  })
  public rooms?: RoomEntity[];

  @Exclude()
  @CreateDateColumn({ readonly: true })
  public createdAt?: Date;

  @Exclude()
  @UpdateDateColumn({ readonly: true })
  public updatedAt?: Date;
}
