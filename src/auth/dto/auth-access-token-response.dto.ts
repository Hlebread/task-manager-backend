import { ObjectType, PickType } from '@nestjs/graphql';

import { AuthTokensResponseDto } from './auth-tokens-response.dto';

/**
 * DTO with access and refresh tokens.
 *
 * @class
 */
@ObjectType()
export class AuthAccessTokenResponseDto extends PickType(AuthTokensResponseDto, ['access_token']) {}
