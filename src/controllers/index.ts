import { Request, Response } from 'express';
import { Service } from '../services';

export type ResponseError = {
  error: ControllerErrors | unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

enum ControllerErrors {
  internal = 'Internal Server Error',
  requiredId = 'Id is required',
  badRequest = 'Bad request',
}

export abstract class Controller<T> {
  protected errors = ControllerErrors;

  constructor(protected service: Service<T>) {}

  read = async (
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const objs = await this.service.read();
      return res.status(200).json(objs);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  abstract readOne(
    req: Request<{ id: string }>,
    res: Response<T | ResponseError>
  ): Promise<typeof res>;

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>
  ): Promise<typeof res>;

  abstract update(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>
  ): Promise<typeof res>;

  abstract delete(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>
  ): Promise<typeof res>;
}