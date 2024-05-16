import { Injectable } from '@nestjs/common';
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Role } from '@enums';

/**
 * Auth entity.
 *
 * @export
 * @class AuthEntity
 */
@Entity('auth')
@Injectable()
export class AuthEntity {
  @PrimaryColumn({ generated: 'increment', nullable: false, unique: true })
  public id?: number;

  @Column('varchar')
  public email?: string;

  @Column('varchar')
  public password?: string;

  @Column('enum', { enum: Role, enumName: 'role', default: Role.user })
  public role?: Role;

  @Column('longtext', { nullable: true })
  public refreshToken?: string;

  @Exclude()
  @CreateDateColumn({ readonly: true })
  public createdAt?: Date;

  @Exclude()
  @UpdateDateColumn({ readonly: true })
  public updatedAt?: Date;
}
