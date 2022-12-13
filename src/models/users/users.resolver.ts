import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { JwtAccessTokenGuard } from '@/auth/guards';
import { EnvironmentGuard, Environments, Public } from '@/common';

import { CreateUserInput, UpdateUserInput } from './dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
@UseGuards(JwtAccessTokenGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User, {
    name: 'createUser',
    description: 'Creates new user entity with provided data',
  })
  @UseGuards(EnvironmentGuard([Environments.DEVELOPMENT, Environments.PRODUCTION]))
  create(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users', description: 'Returns array of all users' })
  @Public()
  findAll(@Args('withDeleted', { defaultValue: false }) withDeleted: boolean): Promise<User[]> {
    return this.usersService.findAll(withDeleted);
  }

  @Query(() => User, { name: 'userById', description: 'Returns user with provided ID' })
  findOneById(@Args('id', { type: () => String }) id: User['id']): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Query(() => User, { name: 'userByEmail', description: 'Returns user with provided email' })
  findOneByEmail(@Args('email', { type: () => String }) email: User['email']): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }

  @Mutation(() => User, {
    name: 'updateUser',
    description: 'Updates the user entity corresponding to the provided ID with the provided data',
  })
  update(
    @Args('id', { type: () => String }) id: User['id'],
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => User, {
    name: 'deleteUser',
    description: 'Permanently deletes the user entity corresponding to the provided ID',
  })
  @UseGuards(EnvironmentGuard([Environments.DEVELOPMENT, Environments.PRODUCTION]))
  delete(@Args('id', { type: () => String }) id: User['id']): Promise<User> {
    return this.usersService.delete(id);
  }

  @Mutation(() => User, {
    name: 'softDeleteUser',
    description: 'Softly deletes the user entity corresponding to the provided ID',
  })
  softDelete(@Args('id', { type: () => String }) id: User['id']): Promise<User> {
    return this.usersService.softDelete(id);
  }

  @Mutation(() => User, {
    name: 'restoreUser',
    description:
      'Restores a user entity corresponding to the provided ID that has been soft-deleted',
  })
  restore(@Args('id', { type: () => String }) id: User['id']): Promise<User> {
    return this.usersService.restore(id);
  }
}
