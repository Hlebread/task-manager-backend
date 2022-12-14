import { BadRequestException } from '@nestjs/common';

export class ListNotDeletedException extends BadRequestException {
  constructor() {
    super('List is not deleted');
  }
}
