import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { JwtAccessTokenGuard } from '@/auth/guards';
import { GetCurrentUser } from '@/common';

import { UpdateUserInput } from './dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
@UseGuards(JwtAccessTokenGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User, {
    name: 'updateCurrentUser',
    description: 'Updates the current user entity with the provided data',
  })
  update(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @GetCurrentUser() userFromContext: User,
  ): Promise<User> {
    return this.usersService.update(userFromContext.id, updateUserInput);
  }

  @Mutation(() => User, {
    name: 'softDeleteCurrentUser',
    description: 'Softly deletes the current user entity',
  })
  softDelete(@GetCurrentUser() userFromContext: User): Promise<User> {
    return this.usersService.softDelete(userFromContext.id);
  }
}
