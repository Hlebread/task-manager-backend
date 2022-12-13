import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthConfigService } from '@/config';
import { User, UsersService } from '@/models/users';

import { AuthBasicService } from '../auth-basic';
import { AuthAccessTokenResponseDto, AuthSignUpInput, AuthTokensResponseDto } from '../dto';
import { AuthTokenPayload } from '../interfaces';

/**
 * Service dealing with basic JWT authentication operations.
 *
 * @class
 */
@Injectable()
export class AuthJwtService {
  /**
   * @ignore
   */
  constructor(
    private readonly authBasicService: AuthBasicService,
    private readonly authConfigService: AuthConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  public async register(registrationInput: AuthSignUpInput): Promise<AuthTokensResponseDto> {
    const user = await this.authBasicService.register(registrationInput);
    const tokens = await this.getJwtTokens(user);

    await this.setCurrentRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  public async logIn(userFromContext: User): Promise<AuthTokensResponseDto> {
    const user = await this.authBasicService.logIn(userFromContext);
    const tokens = await this.getJwtTokens(user);

    await this.setCurrentRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  public async refresh(userFromContext: User): Promise<AuthAccessTokenResponseDto> {
    const newAccessToken = await this.getJwtAccessToken(userFromContext);

    return { access_token: newAccessToken };
  }

  public logOut({ id }: User): Promise<User> {
    return this.removeCurrentRefreshToken(id);
  }

  /**
   * Checks validity of refresh token.
   *
   * @param userId Unique user id.
   * @param refreshToken Refresh token string.
   *
   * @returns Promise with user entity object.
   */
  public async getUserIfRefreshTokenMatches(
    userId: User['id'],
    refreshToken: string,
  ): Promise<User> {
    const user = await this.usersService.findOneById(userId);

    const isRefreshTokenMatching = await bcrypt.compare(refreshToken, user.refresh_token);

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  /**
   * Creates access and refresh tokens.
   *
   * @param user User entity.
   *
   * @returns Promise object with access and refresh tokens.
   */
  public async getJwtTokens(user: User): Promise<AuthTokensResponseDto> {
    const [access_token, refresh_token] = await Promise.all([
      this.getJwtAccessToken(user),
      this.getJwtRefreshToken(user),
    ]);

    return { access_token, refresh_token };
  }

  /**
   * Creates JWT access token.
   *
   * @param user User entity.
   *
   * @returns Promise with access token.
   */
  public async getJwtAccessToken(user: User): Promise<AuthTokensResponseDto['access_token']> {
    const options: JwtSignOptions = {
      secret: this.authConfigService.jwtAtSecret,
      expiresIn: this.authConfigService.jwtAtExpTime,
    };

    return this.getJwtToken(user, options);
  }

  /**
   * Creates JWT refresh token.
   *
   * @param user User entity.
   *
   * @returns Promise with refresh token.
   */
  public async getJwtRefreshToken(user: User): Promise<AuthTokensResponseDto['refresh_token']> {
    const options: JwtSignOptions = {
      secret: this.authConfigService.jwtRtSecret,
      expiresIn: this.authConfigService.jwtRtExpTime,
    };

    return this.getJwtToken(user, options);
  }

  /**
   * Sets user's new refresh token to the database.
   *
   * @param userId Unique user id.
   * @param refreshToken Refresh token string.
   */
  public async setCurrentRefreshToken(userId: User['id'], refreshToken: string): Promise<void> {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    this.usersService.update(userId, {
      refresh_token: currentHashedRefreshToken,
    });
  }

  /**
   * Removes user's current refresh token to the database.
   *
   * @param userId Unique user id.
   * @param refreshToken Refresh token string.
   */
  public removeCurrentRefreshToken(userId: User['id']): Promise<User> {
    return this.usersService.update(userId, {
      refresh_token: null,
    });
  }

  /**
   * Creates JWT token.
   *
   * @param user User entity.
   * @param options JWT sign options.
   *
   * @returns Promise with refresh token.
   */
  private async getJwtToken({ id, email }: User, options: JwtSignOptions): Promise<string> {
    const payload: AuthTokenPayload = { userId: id, email };

    return this.jwtService.signAsync(payload, options);
  }
}
