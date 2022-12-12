import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { User } from '@/models/users';

import { AuthBasicService } from '../auth-basic';

/**
 * Strategy implementing local authentication.
 *
 * @class
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(forwardRef(() => AuthBasicService))
    private readonly authBasicService: AuthBasicService,
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    return this.authBasicService.getAuthenticatedUser(email, password);
  }
}
