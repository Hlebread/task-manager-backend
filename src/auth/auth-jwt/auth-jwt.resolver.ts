import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';

import { GetCurrentUser } from '@/common';

import {
  AuthAccessTokenResponseDto,
  AuthSignInInput,
  AuthSignUpInput,
  AuthTokensResponseDto,
} from '../dto';
import { JwtAccessTokenGuard, JwtRefreshTokenGuard, LocalAuthenticationGuard } from '../guards';

import { AuthJwtService } from './auth-jwt.service';

@Resolver(() => AuthTokensResponseDto)
export class AuthJwtResolver {
  constructor(private readonly authJwtService: AuthJwtService) {}

  @Mutation(() => AuthTokensResponseDto, {
    name: 'registerUserTokens',
    description: 'Registers new user with provided credentials',
  })
  register(
    @Args('authSignUpInput') authSignUpInput: AuthSignUpInput,
  ): Promise<AuthTokensResponseDto> {
    return this.authJwtService.register(authSignUpInput);
  }

  @Mutation(() => AuthTokensResponseDto, {
    name: 'loginUserTokens',
    description: 'Logs in user with provided credentials',
  })
  @UseGuards(LocalAuthenticationGuard)
  logIn(
    @Args('authSignInInput') _: AuthSignInInput,
    @GetCurrentUser() userFromContext,
  ): Promise<AuthTokensResponseDto> {
    return this.authJwtService.logIn(userFromContext);
  }

  @Mutation(() => AuthAccessTokenResponseDto, {
    name: 'refreshUserTokens',
    description: 'Refreshes user access token',
  })
  @UseGuards(JwtRefreshTokenGuard)
  refresh(@GetCurrentUser() userFromContext): Promise<Pick<AuthTokensResponseDto, 'access_token'>> {
    return this.authJwtService.refresh(userFromContext);
  }

  @Query(() => String, {
    name: 'logoutUserTokens',
    description: 'Logs out user',
  })
  @UseGuards(JwtAccessTokenGuard)
  async logOut(@GetCurrentUser() userFromContext): Promise<string> {
    await this.authJwtService.logOut(userFromContext);

    return 'OK';
  }
}
