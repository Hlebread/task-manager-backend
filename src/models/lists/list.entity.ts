import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';

import { EntityBase } from '@/common/abstractions';

import { User } from '../users';

import { ListType } from './enums';

@Entity()
@ObjectType()
export class List extends EntityBase {
  @Field({ description: 'List name' })
  @Column({ type: 'varchar' })
  readonly name: string;

  @Field({ nullable: true, description: 'List color' })
  @Column({ type: 'varchar', nullable: true })
  readonly color: string;

  @Field({ nullable: true, description: 'List type' })
  @Column({ type: 'varchar', default: ListType.Task })
  readonly type: ListType;

  @Field({ description: 'List order' })
  @Column({ type: 'decimal', default: 0 })
  readonly order: number;

  @Field({ description: 'Is list archived' })
  @Column({ type: 'boolean', default: false })
  readonly archived: boolean;

  @Field({ description: 'Is list hidden' })
  @Column({ type: 'boolean', default: false })
  readonly hidden: boolean;

  @Field({ description: 'Is list pinned' })
  @Column({ type: 'boolean', default: false })
  readonly pinned: boolean;

  // @Field({ description: 'Author' })
  @ManyToOne(() => User, (author: User) => author.lists)
  readonly author: User;
}
