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
 * JwtStrategy for the authentication of the API.
 *
 * @export
 * @class JwtStrategy
 * @extends {PassportStrategy(Strategy)}
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  /**
   * Creates an instance of JwtStrategy.
   *
   * @param {ConfigService} config
   * @memberof JwtStrategy
   */
  public constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      algorithms: 'RS256',
      ignoreExpiration: false,
      secretOrKey: fs
        .readFileSync(join(process.cwd(), config.get('JWT_PVT_KEY')))
        .toString(),
    });
  }

  /**
   * Validate the decrypted payload.
   *
   * @param {JwtPayload} payload
   * @returns {JwtPayload<AuthEntity>}
   * @memberof JwtStrategy
   */
  public async validate(
    payload: JwtPayload<AuthEntity>,
  ): Promise<JwtPayload<AuthEntity>> {
    return payload;
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && '__jwt-token' in req.cookies) {
      return req.cookies['__jwt-token'];
    }

    return null;
  }
}
