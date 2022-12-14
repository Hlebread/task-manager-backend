import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';

import { EntityBase } from '@/common/abstractions';

import { List } from '../lists';

@Entity()
@ObjectType()
export class User extends EntityBase {
  @Field({ nullable: true, description: 'Timestamp of user last sign in' })
  @Column({ type: 'timestamptz', nullable: true })
  readonly last_sign_in_at: Date;

  @Field({ description: 'User email' })
  @Column({ type: 'varchar', unique: true })
  readonly email: string;

  @Field({ description: 'User backup email', nullable: true })
  @Column({ type: 'varchar', nullable: true })
  readonly backup_email: string;

  @Field({ description: 'Is user email verified' })
  @Column({ type: 'boolean', default: false })
  readonly email_verified: boolean;

  @Column({ type: 'varchar' })
  readonly password: string;

  @Column({ type: 'varchar', nullable: true })
  readonly refresh_token: string;

  @Field({ nullable: true, description: 'User display name' })
  @Column({ type: 'varchar', nullable: true })
  readonly display_name: string;

  @Field({ nullable: true, description: 'User given name' })
  @Column({ type: 'varchar', nullable: true })
  readonly given_name: string;

  @Field({ nullable: true, description: 'User family name' })
  @Column({ type: 'varchar', nullable: true })
  readonly family_name: string;

  @Field({ nullable: true, description: 'User gender' })
  @Column({ type: 'varchar', nullable: true })
  readonly gender: string;

  @Field({ nullable: true, description: 'User date of birth' })
  @Column({ type: 'timestamptz', nullable: true })
  readonly date_of_birth: Date;

  @Field({ nullable: true, description: 'User photo URL' })
  @Column({ type: 'varchar', nullable: true })
  readonly photo_url: string;

  @Field({ nullable: true, description: 'User phone number' })
  @Column({ type: 'varchar', nullable: true })
  readonly phone_number: string;

  @Field({ description: 'User browser locale' })
  @Column({ type: 'varchar', default: 'en' })
  readonly locale: string;

  @Field(() => [List], { description: 'User lists' })
  @OneToMany(() => List, (list: List) => list.author)
  readonly lists: List[];
}
