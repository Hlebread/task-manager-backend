import { EntityBase } from './entity-base.abstraction';

export abstract class CrudService<E extends EntityBase> {
  abstract create(dto: any): Promise<E>;

  abstract findAll(withDeleted?: boolean): Promise<E[]>;

  abstract findOneById(id: E['id']): Promise<E>;

  abstract update(id: E['id'], dto: any): Promise<E>;

  abstract delete(id: E['id']): Promise<E>;

  abstract softDelete(id: E['id']): Promise<E>;

  abstract restore(id: E['id']): Promise<E>;
}
