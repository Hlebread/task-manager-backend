import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service dealing with authentication config based operations.
 *
 * @class
 */
@Injectable()
export class AuthConfigService {
  /**
   * @ignore
   */
  constructor(private configService: ConfigService) {}

  /**
   * JWT access token secret
   *
   * @property
   */
  get jwtAtSecret(): string {
    return this.configService.get<string>('auth.jwtAtSecret');
  }

  /**
   * JWT access token expiration time
   *
   * @property
   */
  get jwtAtExpTime(): string {
    return this.configService.get<string>('auth.jwtAtExpTime');
  }

  /**
   * JWT refresh token secret
   *
   * @property
   */
  get jwtRtSecret(): string {
    return this.configService.get<string>('auth.jwtRtSecret');
  }

  /**
   * JWT refresh token expiration time
   *
   * @property
   */
  get jwtRtExpTime(): string {
    return this.configService.get<string>('auth.jwtRtExpTime');
  }

  // ? Temporarily commented, because not implemented
  /**
   * JWT verification token secret
   *
   * @property
   */
  // get jwtVtSecret(): string {
  //   return this.configService.get<string>('auth.jwtVtSecret');
  // }

  /**
   * JWT verification token expiration time
   *
   * @property
   */
  // get jwtVtExpTime(): string {
  //   return this.configService.get<string>('auth.jwtVtExpTime');
  // }

  /**
   * Google auth unique app id
   *
   * @property
   */
  // get gAuthId(): string {
  //   return this.configService.get<string>('auth.gAuthId');
  // }

  /**
   * Google auth secret
   *
   * @property
   */
  // get gAuthSecret(): string {
  //   return this.configService.get<string>('auth.gAuthSecret');
  // }
}
