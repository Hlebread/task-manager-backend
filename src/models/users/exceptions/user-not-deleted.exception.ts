import { BadRequestException } from '@nestjs/common';

export class UserNotDeletedException extends BadRequestException {
  constructor() {
    super('User is not deleted');
  }
}
