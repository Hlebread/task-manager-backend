import { Injectable } from '@nestjs/common';

import { User } from '@/models/users';

import { AuthBasicService } from '../auth-basic';
import { AuthJwtService } from '../auth-jwt';
import { AuthSignUpInput, AuthTokensResponseDto } from '../dto';
import { UserAndAuthCookies } from '../interfaces';

/**
 * Service dealing with authentication with cookies operations.
 *
 * @class
 */
@Injectable()
export class AuthCookiesService {
  /**
   * @ignore
   */
  constructor(
    private readonly authBasicService: AuthBasicService,
    private readonly authJwtService: AuthJwtService,
  ) {}

  public async register(registrationInput: AuthSignUpInput): Promise<UserAndAuthCookies> {
    const user = await this.authBasicService.register(registrationInput);
    const tokens = await this.authJwtService.getJwtTokens(user);
    const cookies = this.getAuthCookies(tokens);

    await this.authJwtService.setCurrentRefreshToken(user.id, tokens.refresh_token);

    return { user, cookies };
  }

  public async logIn(userFromContext: User, rememberUser = true): Promise<UserAndAuthCookies> {
    const user = await this.authBasicService.logIn(userFromContext);
    const cookies: UserAndAuthCookies['cookies'] = [];

    if (rememberUser) {
      const tokens = await this.authJwtService.getJwtTokens(user);

      cookies.push(...this.getAuthCookies(tokens));

      await this.authJwtService.setCurrentRefreshToken(user.id, tokens.refresh_token);
    } else {
      const accessToken = await this.authJwtService.getJwtAccessToken(user);

      cookies.push(this.getAccessTokenCookie(accessToken));
    }

    return { user, cookies };
  }

  public async refresh(userFromContext: User): Promise<UserAndAuthCookies> {
    const { access_token } = await this.authJwtService.refresh(userFromContext);
    const cookies: UserAndAuthCookies['cookies'] = [this.getAccessTokenCookie(access_token)];

    return { user: userFromContext, cookies };
  }

  public async logOut(userFromContext: User): Promise<UserAndAuthCookies> {
    const user = await this.authJwtService.logOut(userFromContext);
    const cookies = this.getCookiesForLogOut();

    return { user, cookies };
  }

  private getAuthCookies({
    access_token,
    refresh_token,
  }: AuthTokensResponseDto): UserAndAuthCookies['cookies'] {
    return [this.getAccessTokenCookie(access_token), this.getRefreshTokenCookie(refresh_token)];
  }

  private getAccessTokenCookie(accessToken: string): string {
    return this.getAuthCookie('Authentication', accessToken, '1d');
  }

  private getRefreshTokenCookie(refreshToken: string): string {
    return this.getAuthCookie('Authentication', refreshToken, '1d');
  }

  private getAuthCookie(name: string, token: string, maxAge?: string): string {
    return `${name}=${token}; HttpOnly; Path=/;${maxAge ? ` Max-Age=${maxAge}` : ''}`;
  }

  private getCookiesForLogOut(): UserAndAuthCookies['cookies'] {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }
}
