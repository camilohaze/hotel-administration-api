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
 * Gender entity.
 *
 * @export
 * @class GenderEntity
 */
@Entity('genders')
@Injectable()
export class GenderEntity {
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
