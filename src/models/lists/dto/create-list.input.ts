import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

import { List } from '../list.entity';

import { UpdateListInput } from './update-list.input';

@InputType()
export class CreateListInput extends PartialType(UpdateListInput) implements Partial<List> {
  @Field({ description: 'List name' })
  @IsString({ message: 'Name must be a string' })
  name: string;
}
