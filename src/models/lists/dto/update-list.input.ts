import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsIn, IsBoolean, IsInt } from 'class-validator';

import { IsColor } from '@/common';

import { ListType } from '../enums';
import { List } from '../list.entity';

@InputType()
export class UpdateListInput implements Partial<List> {
  @Field({ nullable: true, description: 'List name' })
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  name: string;

  @Field({ nullable: true, description: 'List color' })
  @IsOptional()
  @IsColor({ message: 'Color must be a valid HEX or RGB' })
  readonly color: string;

  @Field({ nullable: true, description: 'List type' })
  @IsOptional()
  @IsIn([ListType.Note, ListType.Task], {
    message: 'List type can be only "note list" or "task list"',
  })
  readonly type: ListType;

  @Field({ nullable: true, description: 'List order' })
  @IsOptional()
  @IsInt()
  readonly order: number;

  @Field({ nullable: true, description: 'Is list archived' })
  @IsOptional()
  @IsBoolean()
  readonly archived: boolean;

  @Field({ nullable: true, description: 'Is list hidden' })
  @IsOptional()
  @IsBoolean()
  readonly hidden: boolean;

  @Field({ nullable: true, description: 'Is list pinned' })
  @IsOptional()
  @IsBoolean()
  readonly pinned: boolean;
}
