import { Injectable } from '@nestjs/common';
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

/**
 * Room type entity.
 *
 * @export
 * @class RoomTypeEntity
 */
@Entity('room-types')
@Injectable()
export class RoomTypeEntity {
  @PrimaryColumn({ generated: 'increment' })
  public id?: number;

  @Column('varchar')
  public type?: string;

  @Column('varchar')
  public description?: string;

  @Column('decimal', { precision: 11, scale: 1 })
  public price?: string;

  @Column('decimal', { precision: 3, scale: 1 })
  public tax?: string;

  @Column('int')
  public minimum?: number;

  @Column('int')
  public maximum?: number;

  @Exclude()
  @CreateDateColumn({ readonly: true })
  public createdAt?: Date;

  @Exclude()
  @UpdateDateColumn({ readonly: true })
  public updatedAt?: Date;
}
