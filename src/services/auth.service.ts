import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { join } from 'path';
import * as fs from 'fs';

import { Token } from '@interfaces';
import { AuthEntity } from '@entities';

import { ConfigService } from './config.service';
/**
 * Auth services.
 *
 * @export
 * @class AuthService
 */
@Injectable()
export class AuthService {
  /**
   * Creates an instance of AuthService.
   *
   * @param {ConfigService} config
   * @param {Repository<AuthModel>} authRepository
   * @memberof AuthService
   */
  public constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
    private readonly config: ConfigService,
  ) {}

  /**
   * Validate the email and password to return the user's data, which will be encrypted.
   *
   * @param {AuthEntity} auth
   * @returns {Promise<AuthEntity>}
   * @memberof AuthService
   */
  public async login(auth: AuthEntity): Promise<AuthEntity> {
    const { email, password } = auth;

    return await this.authRepository.findOne({ where: { email, password } });
  }

  /**
   * Validate the emal and refreshToken to return the user's data, which will be encrypted.
   *
   * @param {AuthEntity} auth
   * @returns {Promise<AuthEntity>}
   * @memberof AuthService
   */
  public async refresh(auth: AuthEntity): Promise<AuthEntity> {
    const { email, refreshToken } = auth;

    return await this.authRepository.findOne({
      where: { email, refreshToken },
    });
  }

  /**
   * Close session.
   *
   * @param {AuthEntity} auth
   * @returns {Promise<AuthEntity>}
   * @memberof AuthService
   */
  public async logout(auth: AuthEntity): Promise<AuthEntity> {
    const { email, refreshToken } = auth;
    const session = await this.authRepository.findOne({
      where: { email, refreshToken },
    });

    session.refreshToken = '';

    return this.authRepository.save(session);
  }

  /**
   * Save auth data.
   *
   * @param {AuthEntity} auth
   * @returns {Promise<AuthEntity>}
   * @memberof AuthService
   */
  public async save(auth: AuthEntity): Promise<AuthEntity> {
    return this.authRepository.save(auth);
  }

  /**
   * Create token with the authenticated user's data.
   *
   * @returns {Token}
   * @memberof AuthService
   */
  public createToken(auth: AuthEntity): Token {
    const { id, email } = auth;
    const token = jwt.sign(
      {
        data: {
          id,
          email,
        },
      },
      fs
        .readFileSync(join(process.cwd(), this.config.get('JWT_PVT_KEY')))
        .toString(),
      {
        algorithm: 'RS256',
        expiresIn: '60m',
      },
    );
    const refreshToken = jwt.sign(
      {
        data: {
          id,
          email,
        },
      },
      fs
        .readFileSync(
          join(process.cwd(), this.config.get('JWT_REFRESH_PVT_KEY')),
        )
        .toString(),
      {
        algorithm: 'RS256',
        expiresIn: '90m',
      },
    );
    const expiresInToken = 60000 * 60;
    const expiresInRefreshToken = 60000 * 90;

    return {
      token,
      expiresInToken,
      refreshToken,
      expiresInRefreshToken,
    };
  }
}
