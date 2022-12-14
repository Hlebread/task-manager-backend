import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthConfigService } from '@/config';
import { User } from '@/models/users';

import { AuthJwtService } from '../auth-jwt';
import { AuthTokenPayload } from '../interfaces';

/**
 * Strategy implementing JWT access token refresh.
 *
 * @class
 */
@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  /**
   * @ignore
   */
  constructor(
    private readonly authConfigService: AuthConfigService,
    @Inject(forwardRef(() => AuthJwtService)) private readonly authJwtService: AuthJwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (request: Request) => request.get('Refresh'),
        (request: Request) => request?.cookies?.Refresh,
      ]),
      secretOrKey: authConfigService.jwtRtSecret,
      passReqToCallback: true,
    });
  }

  /**
   * Method that get Refresh token from from headers
   * and compare it with stored user refresh token.
   * If it matches than guard allow to activate endpoint
   *
   * @ignore
   */
  validate(request: Request, payload: AuthTokenPayload): Promise<User> {
    const refreshToken = request.get('Refresh') ?? request.cookies?.Refresh;

    return this.authJwtService.getUserIfRefreshTokenMatches(payload.userId, refreshToken);
  }
}
