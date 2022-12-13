import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';

import { GetCurrentUser } from '@/common';
import { User } from '@/models/users';

import { JwtAccessTokenGuard } from './guards';

@Resolver(() => User)
export class AuthResolver {
  @Query(() => User, {
    name: 'authenticateUser',
    description: 'Verifies JSON Web Tokens and returns user data',
  })
  @UseGuards(JwtAccessTokenGuard)
  authenticate(@GetCurrentUser() userFromContext): Promise<User> {
    return userFromContext;
  }
}
