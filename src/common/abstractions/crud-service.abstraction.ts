import { EntityBase } from './entity-base.abstraction';

export abstract class CrudService<E extends EntityBase> {
  abstract create(dto: any, ...args: any): Promise<E>;

  abstract findAll(withDeleted?: boolean, ...args: any): Promise<E[]>;

  abstract findOneById(id: E['id'], ...args: any): Promise<E>;

  abstract update(id: E['id'], dto: any, ...args: any): Promise<E>;

  abstract delete(id: E['id'], ...args: any): Promise<E>;

  abstract softDelete(id: E['id'], ...args: any): Promise<E>;

  abstract restore(id: E['id'], ...args: any): Promise<E>;
}
