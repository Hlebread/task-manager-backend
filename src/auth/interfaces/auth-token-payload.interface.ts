import { User } from '@/models/users';

/**
 * Interface that represent a JWT token payload.
 *
 * @interface
 */
export interface AuthTokenPayload {
  /**
   * Unique user id
   *
   * @property
   */
  userId: User['id'];

  /**
   * Unique user email
   *
   * @property
   */
  email: User['email'];
}
