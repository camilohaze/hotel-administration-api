import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { join } from 'path';
import * as fs from 'fs';

import { JwtPayload } from '@interfaces';
import { AuthEntity } from '@entities';
import { ConfigService } from '@services';

/**
 * JwtRefreshStrategy for the authentication of the API.
 *
 * @export
 * @class JwtRefreshStrategy
 * @extends {PassportStrategy(Strategy)}
 */
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  /**
   * Creates an instance of JwtRefreshStrategy.
   *
   * @param {ConfigService} config
   * @memberof JwtRefreshStrategy
   */
  public constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtRefreshStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      algorithms: 'RS256',
      ignoreExpiration: false,
      secretOrKey: fs
        .readFileSync(join(process.cwd(), config.get('JWT_REFRESH_PVT_KEY')))
        .toString(),
      passReqToCallback: true,
    });
  }

  /**
   * Validate the decrypted payload.
   *
   * @param {Request} req
   * @param {JwtPayload<AuthEntity>} payload
   * @returns {Promise<JwtPayload<AuthEntity>>}
   * @memberof JwtRefreshStrategy
   */
  public async validate(
    req: Request,
    payload: JwtPayload<AuthEntity>,
  ): Promise<JwtPayload<AuthEntity>> {
    const refreshToken = req.cookies['__jwt-refresh'];

    return { ...payload, refreshToken };
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && '__jwt-refresh' in req.cookies) {
      return req.cookies['__jwt-refresh'];
    }

    return null;
  }
}
