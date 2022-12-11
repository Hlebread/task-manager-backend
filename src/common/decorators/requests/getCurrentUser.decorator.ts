import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { User } from '@/models/users';

/**
 * A decorator that get current user from context.
 *
 * @decorator
 */
export const GetCurrentUser = createParamDecorator(
  (data: keyof User | (keyof User)[], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const gqlReq = ctx.getContext().req;
    const user = gqlReq.user;

    if (!data) {
      return user;
    }

    return Array.isArray(data)
      ? Object.fromEntries(Object.entries(user).filter(([key]) => data.includes(key as keyof User)))
      : user[data];
  },
);
