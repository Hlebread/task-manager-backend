import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User, UsersService } from '@/models/users';

import { AuthSignUpInput } from '../dto';
import { WrongCredentialsException } from '../exceptions';

/**
 * Service with basic authentication operations.
 *
 * @class
 */
@Injectable()
export class AuthBasicService {
  constructor(private readonly usersService: UsersService) {}

  public async register(registrationInput: AuthSignUpInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(registrationInput.password, 10);

    const createdUser = await this.usersService.create({
      ...registrationInput,
      password: hashedPassword,
    });

    return createdUser;
  }

  public async logIn(userFromContext: User): Promise<User> {
    const user = await this.usersService.update(userFromContext.id, {
      last_sign_in_at: new Date(),
    });

    return user;
  }

  // public logout() {}

  public async getAuthenticatedUser(email: string, plainTextPassword: string): Promise<User> {
    try {
      const user = await this.usersService.findOneByEmail(email);

      await this.verifyPassword(plainTextPassword, user.password);

      return user;
    } catch (error) {
      throw new WrongCredentialsException();
    }
  }

  private async verifyPassword(plainTextPassword: string, hashedPassword: string): Promise<void> {
    const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);

    if (!isPasswordMatching) {
      throw new WrongCredentialsException();
    }
  }
}
