import { User } from '@/models/users';

export interface UserAndAuthCookies {
  user: User;
  cookies: [string?] | [string?, string?];
}
