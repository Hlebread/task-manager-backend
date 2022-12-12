import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersService } from '@/models/users';

import { AuthTokenPayload } from '../interfaces';

/**
 * Strategy implementing JWT authentication.
 *
 * @class
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * @ignore
   */
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.get('Authentication'),
      ]),
      secretOrKey: 'secret',
    });
  }

  /**
   * Method that try to get user by provided id and if can find it
   * in database, than guard allow to activate endpoint
   *
   * @ignore
   */
  validate(payload: AuthTokenPayload) {
    return this.userService.findOneById(payload.userId);
  }
}
