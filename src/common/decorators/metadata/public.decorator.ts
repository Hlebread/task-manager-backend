import { CustomDecorator, SetMetadata } from '@nestjs/common';

/**
 * A unique key that is added to the metadata.
 *
 * @constant
 */
export const PUBLIC_KEY = Symbol('Is public');

/**
 * Decorator that sets `isPublic` metadata.
 *
 * @returns "@Public" decorator
 *
 * @decorator
 */
export const Public = (): CustomDecorator<symbol> => SetMetadata(PUBLIC_KEY, true);
