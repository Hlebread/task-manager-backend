import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@ObjectType({ isAbstract: true })
export abstract class EntityBase {
  @Field(() => ID, { description: 'Unique entity ID' })
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field({ description: 'Timestamp when entity was created' })
  @CreateDateColumn({ type: 'timestamptz' })
  readonly created_at: Date;

  @Field({ description: 'Timestamp when entity was updated' })
  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updated_at: Date;

  @Field({ nullable: true, description: 'Timestamp when entity was softly deleted' })
  @DeleteDateColumn({ type: 'timestamptz' })
  readonly deleted_at: Date;
}
