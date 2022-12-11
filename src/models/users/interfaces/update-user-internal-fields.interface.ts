import { User } from '../user.entity';

export interface UpdateUserInternalFields
  extends Partial<Pick<User, 'last_sign_in_at' | 'refresh_token'>> {}
