import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsOptional,
  IsIn,
  IsDate,
  IsUrl,
  IsPhoneNumber,
  IsLocale,
} from 'class-validator';

import { User } from '../user.entity';

@InputType()
export class UpdateUserInput implements Partial<User> {
  @Field({ defaultValue: null, description: 'User display name' })
  @IsOptional()
  @IsString({ message: 'Display name must be a string' })
  display_name: string;

  @Field({ defaultValue: null, description: 'User given name' })
  @IsOptional()
  @IsString({ message: 'Given name must be a string' })
  given_name: string;

  @Field({ defaultValue: null, description: 'User family name' })
  @IsOptional()
  @IsString({ message: 'Family name must be a string' })
  family_name: string;

  @Field({ defaultValue: null, description: 'User gender' })
  @IsOptional()
  @IsIn(['male', 'female'], {
    message: 'Gender must be one of the following values: "male", "female"',
  })
  gender: string;

  @Field({ defaultValue: null, description: 'User date of birth' })
  @IsOptional()
  @IsDate()
  date_of_birth: Date;

  @Field({ defaultValue: null, description: 'User photo URL' })
  @IsOptional()
  @IsUrl()
  photo_url: string;

  @Field({ defaultValue: null, description: 'User phone number' })
  @IsOptional()
  @IsPhoneNumber()
  phone_number: string;

  @Field({ defaultValue: 'en', description: 'User browser locale' })
  @IsOptional()
  @IsLocale({ message: 'Locale has invalid format' })
  locale: string;
}
