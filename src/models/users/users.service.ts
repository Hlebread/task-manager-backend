import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';

import { CrudService } from '@/common/abstractions/crud-service.abstraction';

import { CreateUserInput, UpdateUserInput } from './dto';
import { UserExistsException, UserNotDeletedException, UserNotFoundException } from './exceptions';
import { User } from './user.entity';

@Injectable()
export class UsersService implements CrudService<User> {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    try {
      const user = this.usersRepository.create(createUserInput);

      return await this.usersRepository.save(user);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new UserExistsException();
      }

      throw new InternalServerErrorException();
    }
  }

  async findAll(withDeleted?: boolean): Promise<User[]> {
    return this.usersRepository.find({ withDeleted });
  }

  async findOneById(id: User['id']): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async findOneByEmail(email: User['email']): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async update(
    id: User['id'],
    updateUserInput: UpdateUserInput & { last_sign_in_at?: Date },
  ): Promise<User> {
    const { affected } = await this.usersRepository.update({ id }, updateUserInput);

    if (!affected) {
      throw new UserNotFoundException();
    }

    return this.findOneById(id);
  }

  async delete(id: User['id']): Promise<User> {
    const user = await this.findOneById(id);
    const { affected } = await this.usersRepository.delete({ id });

    if (!affected) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async softDelete(id: User['id']): Promise<User> {
    const user = await this.findOneById(id);
    const { affected } = await this.usersRepository.softDelete({ id });

    if (!affected) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async restore(id: User['id']) {
    const user = await this.usersRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!user?.deleted_at) {
      throw new UserNotDeletedException();
    }

    const { affected } = await this.usersRepository.restore({ id });

    if (!(affected || user)) {
      throw new UserNotFoundException();
    }

    return user;
  }
}
