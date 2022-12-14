import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { JwtAccessTokenGuard } from '@/auth/guards';
import { GetCurrentUser } from '@/common';

import { User } from '../users';

import { CreateListInput, UpdateListInput } from './dto';
import { ListAuthorGuard } from './guards';
import { List } from './list.entity';
import { ListsService } from './lists.service';

@Resolver(() => List)
@UseGuards(JwtAccessTokenGuard)
export class ListsResolver {
  constructor(private readonly listsService: ListsService) {}

  @Mutation(() => List, {
    name: 'createList',
    description: 'Creates new list entity with provided data',
  })
  create(
    @Args('createListInput') createListInput: CreateListInput,
    @GetCurrentUser() userFromContext: User,
  ): Promise<List> {
    return this.listsService.create(createListInput, userFromContext);
  }

  @Query(() => [List], { name: 'lists', description: 'Returns array of all user lists' })
  findAll(
    @Args('withDeleted', { defaultValue: false }) withDeleted: boolean,
    @GetCurrentUser() userFromContext: User,
  ): Promise<List[]> {
    return this.listsService.findAll(withDeleted, userFromContext);
  }

  @Query(() => List, { name: 'listById', description: 'Returns list with provided ID' })
  @UseGuards(ListAuthorGuard)
  findOneById(@Args('id', { type: () => String }) id: List['id']): Promise<List> {
    return this.listsService.findOneById(id);
  }

  @Mutation(() => List, {
    name: 'updateList',
    description: 'Updates the list entity corresponding to the provided ID with the provided data',
  })
  @UseGuards(ListAuthorGuard)
  update(
    @Args('id', { type: () => String }) id: List['id'],
    @Args('updateListInput') updateListInput: UpdateListInput,
  ): Promise<List> {
    return this.listsService.update(id, updateListInput);
  }

  @Mutation(() => List, {
    name: 'deleteList',
    description: 'Permanently deletes the list entity corresponding to the provided ID',
  })
  @UseGuards(ListAuthorGuard)
  delete(@Args('id', { type: () => String }) id: List['id']): Promise<List> {
    return this.listsService.delete(id);
  }

  @Mutation(() => List, {
    name: 'softDeleteList',
    description: 'Softly deletes the list entity corresponding to the provided ID',
  })
  @UseGuards(ListAuthorGuard)
  softDelete(@Args('id', { type: () => String }) id: List['id']): Promise<List> {
    return this.listsService.softDelete(id);
  }

  @Mutation(() => List, {
    name: 'restoreList',
    description:
      'Restores a list entity corresponding to the provided ID that has been soft-deleted',
  })
  @UseGuards(ListAuthorGuard)
  restore(@Args('id', { type: () => String }) id: List['id']): Promise<List> {
    return this.listsService.restore(id);
  }
}
