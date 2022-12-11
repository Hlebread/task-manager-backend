import { InputType, PickType } from '@nestjs/graphql';

import { AuthSignUpInput } from './auth-sign-up.input';

/**
 * DTO with user sign in credentials.
 *
 * @class
 */
@InputType()
export class AuthSignInInput extends PickType(AuthSignUpInput, ['email', 'password']) {}
