import { InputType } from '@nestjs/graphql';

import { CreateUserInput } from '@/models/users';

/**
 * DTO with user sign up credentials.
 *
 * @class
 */
@InputType()
export class AuthSignUpInput extends CreateUserInput {}
