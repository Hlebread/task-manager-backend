import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { Request } from 'express';

import { GetCurrentUser } from '@/common';
import { User } from '@/models/users';

import { AuthSignInInput, AuthSignUpInput } from '../dto';
import { JwtAccessTokenGuard, JwtRefreshTokenGuard, LocalAuthenticationGuard } from '../guards';
import { UserAndAuthCookies } from '../interfaces';

import { AuthCookiesService } from './auth-cookies.service';

@Resolver(() => User)
export class AuthCookiesResolver {
  constructor(private readonly authCookiesService: AuthCookiesService) {}

  @Mutation(() => User, {
    name: 'registerUserCookies',
    description: 'Registers new user with provided credentials',
  })
  register(
    @Args('authSignUpInput') authSignUpInput: AuthSignUpInput,
    @Context('request') context: Request,
  ): Promise<User> {
    return this.handleMethod(context, this.authCookiesService.register(authSignUpInput));
  }

  @Mutation(() => User, {
    name: 'loginUserCookies',
    description: 'Logs in user with provided credentials',
  })
  @UseGuards(LocalAuthenticationGuard)
  logIn(
    @Args('authSignInInput') _: AuthSignInInput,
    @Context('request') context: Request,
    @GetCurrentUser() userFromContext,
  ): Promise<User> {
    return this.handleMethod(context, this.authCookiesService.logIn(userFromContext));
  }

  @Mutation(() => User, {
    name: 'refreshUserCookies',
    description: 'Refreshes user access token cookie',
  })
  @UseGuards(JwtRefreshTokenGuard)
  refresh(@Context('request') context: Request, @GetCurrentUser() userFromContext): Promise<User> {
    return this.handleMethod(context, this.authCookiesService.refresh(userFromContext));
  }

  @Query(() => User, {
    name: 'logoutUserCookies',
    description: 'Logs out user',
  })
  @UseGuards(JwtAccessTokenGuard)
  logOut(@Context('request') context: Request, @GetCurrentUser() userFromContext): Promise<User> {
    return this.handleMethod(context, this.authCookiesService.logOut(userFromContext));
  }

  private async handleMethod(
    context: Request,
    calledServiceMethodPromise: Promise<UserAndAuthCookies>,
  ): Promise<User> {
    const { user, cookies } = await calledServiceMethodPromise;

    context.res.setHeader('Set-Cookie', cookies);

    return user;
  }
}
