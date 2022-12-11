import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthJwtService } from '../auth-jwt';
import { AuthTokenPayload } from '../interfaces';

/**
 * Strategy dealing with JWT refresh authentication.
 *
 * @class
 */
@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  /**
   * @ignore
   */
  constructor(
    @Inject(forwardRef(() => AuthJwtService)) private readonly authJwtService: AuthJwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (request: Request) => request?.cookies?.Refresh,
      ]),
      secretOrKey: 'secret',
      passReqToCallback: true,
    });
  }

  /**
   * Method that get Authorization token from cookies or from headers
   * and compare it with stored user refresh token.
   * If it matches than guard allow to activate endpoint
   *
   * @ignore
   */
  validate(request: Request, payload: AuthTokenPayload) {
    console.log(request);

    const refreshToken = 'a';

    return this.authJwtService.getUserIfRefreshTokenMatches(payload.userId, refreshToken);
  }
}
