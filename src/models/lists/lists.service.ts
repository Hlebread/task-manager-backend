import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CrudService } from '@/common/abstractions/crud-service.abstraction';

import { User } from '../users';

import { CreateListInput, UpdateListInput } from './dto';
import { ListNotDeletedException, ListNotFoundException } from './exceptions';
import { List } from './list.entity';

@Injectable()
export class ListsService implements CrudService<List> {
  constructor(@InjectRepository(List) private listsRepository: Repository<List>) {}

  async create(createListInput: CreateListInput, user: User): Promise<List> {
    try {
      const list = this.listsRepository.create({
        ...createListInput,
        author: user,
      });

      return await this.listsRepository.save(list);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll(withDeleted = false, userFromContext: User): Promise<List[]> {
    return this.listsRepository.find({
      where: {
        author: {
          id: userFromContext.id,
        },
      },
      withDeleted,
    });
  }

  async findOneById(id: List['id']): Promise<List> {
    const list = await this.listsRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!list) {
      throw new ListNotFoundException();
    }

    return list;
  }

  async update(id: List['id'], updateListInput: UpdateListInput): Promise<List> {
    const { affected } = await this.listsRepository.update({ id }, updateListInput);

    if (!affected) {
      throw new ListNotFoundException();
    }

    return this.findOneById(id);
  }

  async delete(id: List['id']): Promise<List> {
    const list = await this.findOneById(id);
    const { affected } = await this.listsRepository.delete({ id });

    if (!affected) {
      throw new ListNotFoundException();
    }

    return list;
  }

  async softDelete(id: List['id']): Promise<List> {
    const list = await this.findOneById(id);
    const { affected } = await this.listsRepository.softDelete({ id });

    if (!affected) {
      throw new ListNotFoundException();
    }

    return list;
  }

  async restore(id: List['id']) {
    const list = await this.listsRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!list?.deleted_at) {
      throw new ListNotDeletedException();
    }

    const { affected } = await this.listsRepository.restore({ id });

    if (!(affected || list)) {
      throw new ListNotFoundException();
    }

    return list;
  }
}
