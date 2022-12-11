import { Field, ObjectType } from '@nestjs/graphql';
import { IsJWT } from 'class-validator';

/**
 * DTO with access and refresh tokens.
 *
 * @class
 */
@ObjectType()
export class AuthTokensResponseDto {
  /**
   * Access token
   *
   * @property
   */
  @Field({ description: 'JWT access token' })
  @IsJWT({ message: 'Access token must be a valid JWT string' })
  readonly access_token: string;

  /**
   * Refresh token
   *
   * @property
   */
  @Field({ description: 'JWT refresh token' })
  @IsJWT({ message: 'Refresh token must be a valid JWT string' })
  readonly refresh_token: string;
}
