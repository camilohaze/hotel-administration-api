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
 * City entity.
 *
 * @export
 * @class CityEntity
 */
@Entity('cities')
@Injectable()
export class CityEntity {
  @PrimaryColumn({ generated: 'increment', nullable: false, unique: true })
  public id?: number;

  @Column('varchar')
  public name?: string;

  @Exclude()
  @CreateDateColumn({ readonly: true })
  public createdAt?: Date;

  @Exclude()
  @UpdateDateColumn({ readonly: true })
  public updatedAt?: Date;
}
