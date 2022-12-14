import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { ListsService } from '../lists.service';

/**
 * Guard implementing author authorization.
 *
 * @class
 */
@Injectable()
export class ListAuthorGuard implements CanActivate {
  /**
   * @ignore
   */
  constructor(private readonly listsService: ListsService) {}

  /**
   * A method that check if endpoint have a @Public decorator
   *
   * @returns Boolean value
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const list = await this.listsService.findOneById(ctx.getArgs().id);
    const user = request.user;
    const isMatching = list.author.id === user.id;

    if (!isMatching) {
      throw new UnauthorizedException();
    }

    return true;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req;
  }
}
