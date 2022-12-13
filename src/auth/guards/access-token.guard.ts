import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

import { PUBLIC_KEY } from '@/common';

/**
 * Guard implementing authentication with JWT access token.
 *
 * @class
 */
@Injectable()
export class JwtAccessTokenGuard extends AuthGuard('jwt') {
  /**
   * @ignore
   */
  constructor(private readonly reflector: Reflector) {
    super();
  }

  /**
   * A method that check if endpoint have a @Public decorator
   *
   * @returns Boolean value
   */
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    return super.canActivate(context);
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req;
  }
}
