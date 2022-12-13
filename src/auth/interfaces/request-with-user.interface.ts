import { Request } from 'express';

import { User } from '@/models/users';

export interface RequestWithUser extends Request {
  user: User;
}
