import { SetMetadata } from '@nestjs/common';

/**
 * A unique key that is added to the metadata.
 *
 * @constant
 */
export const PUBLIC_KEY = 'isPublic';

/**
 * A function that creates decorator
 *
 * @returns "@Public" decorator
 * @decorator
 */
export const Public = () => SetMetadata(PUBLIC_KEY, true);
