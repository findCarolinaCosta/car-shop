import { ZodError } from 'zod';
import { Model as IModel } from '../interfaces/ModelInterface';

export interface ServiceError {
  error: ZodError;
}

export abstract class Service<T> {
  constructor(protected model: IModel<T>) {}

  public async read(): Promise<T[]> {
    return this.model.read();
  }

  public async readOne(id: string): Promise<T | null | ServiceError> {
    return this.model.readOne(id);
  }

  public async create(obj: T): Promise<T | null | ServiceError> {
    return this.model.create(obj);
  }

  public async update(id: string, obj: T): Promise<T | null | ServiceError> {
    return this.model.update(id, obj);
  }

  public async delete(id: string): Promise<T | null | ServiceError> {
    return this.model.delete(id);
  }
}