import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { GetCurrentUser } from '@/common';
import { User } from '@/models/users';

import { AuthSignInInput, AuthSignUpInput } from '../dto';
import { LocalAuthenticationGuard } from '../guards';

import { AuthBasicService } from './auth-basic.service';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authenticationService: AuthBasicService) {}

  @Mutation(() => User, {
    name: 'registerUser',
    // description: 'Creates new user entity with provided data',
  })
  register(@Args('authSignUpInput') authSignUpInput: AuthSignUpInput): Promise<User> {
    return this.authenticationService.register(authSignUpInput);
  }

  @Mutation(() => User, {
    name: 'loginUser',
    // description: 'Creates new user entity with provided data',
  })
  @UseGuards(LocalAuthenticationGuard)
  logIn(@Args('authSignInInput') _: AuthSignInInput, @GetCurrentUser() user): Promise<User> {
    return this.authenticationService.logIn(user);
  }
}
