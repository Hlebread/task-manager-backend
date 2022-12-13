import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { EnvironmentGuard, Environments, GetCurrentUser } from '@/common';
import { User } from '@/models/users';

import { AuthSignInInput, AuthSignUpInput } from '../dto';
import { LocalAuthenticationGuard } from '../guards';

import { AuthBasicService } from './auth-basic.service';

@Resolver(() => User)
@UseGuards(EnvironmentGuard([Environments.DEVELOPMENT, Environments.PRODUCTION]))
export class AuthBasicResolver {
  constructor(private readonly authenticationService: AuthBasicService) {}

  @Mutation(() => User, {
    name: 'registerUser',
    description: 'Registers new user with provided credentials',
  })
  register(@Args('authSignUpInput') authSignUpInput: AuthSignUpInput): Promise<User> {
    return this.authenticationService.register(authSignUpInput);
  }

  @Mutation(() => User, {
    name: 'loginUser',
    description: 'Logs in user with provided credentials',
  })
  @UseGuards(LocalAuthenticationGuard)
  logIn(@Args('authSignInInput') _: AuthSignInInput, @GetCurrentUser() user): Promise<User> {
    return this.authenticationService.logIn(user);
  }
}
