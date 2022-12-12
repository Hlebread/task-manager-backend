import { SetMetadata } from '@nestjs/common';

/**
 * A unique key that is added to the metadata.
 *
 * @constant
 */
export const PUBLIC_KEY = Symbol('Public decorator');

/**
 * A function that creates decorator
 *
 * @returns "@Public" decorator
 * @decorator
 */
export const Public = () => SetMetadata(PUBLIC_KEY, true);
