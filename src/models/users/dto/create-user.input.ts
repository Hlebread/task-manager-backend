import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

import { User } from '../user.entity';

import { UpdateUserInput } from './update-user.input';

@InputType({ description: 'DTO with data to create new user entity' })
export class CreateUserInput extends PartialType(UpdateUserInput) implements Partial<User> {
  @Field({ description: 'Email' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @Field({ description: 'Password' })
  @IsString({ message: 'Password must be a string' })
  password: string;
}
