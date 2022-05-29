import { Request, Response } from 'express';
import { Motorcycle as IMotorcycle } from '../interfaces/MotorcycleInterface';
import MotorcycleService from '../services/MotorcycleService';
import { Controller } from './index';

enum ControllerErrors {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
  requiredId = 'Id must have 24 hexadecimal characters',
  badRequest = 'Bad request',
}

type ResponseError = {
  error: ControllerErrors | unknown;
};

interface RequestWithBody<T> extends Request {
  body: T;
}

export default class MotorcycleController extends Controller<IMotorcycle> {
  constructor(
    service = new MotorcycleService(),
    route = '/motorcycles',
  ) {
    super(service, route);
    this.$route = route;
  }

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<IMotorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const twentyFourHexCharacters = /[0-9A-Fa-f]{24}/g;

    if (!twentyFourHexCharacters.test(id)) {
      return res.status(400).json({ error: this.errors.requiredId });
    }

    const motorcycle = await this.service.readOne(id);

    if (!motorcycle) {
      return res.status(404).json({ error: this.errors.notFound });
    }
    return res.status(200).json(motorcycle);
  };

  public create = async (
    req: RequestWithBody<IMotorcycle>,
    res: Response<IMotorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;

    if (!body) return res.status(400).json({ error: this.errors.badRequest });
      
    const newMotorcycle = await this.service.create(body);

    if (!newMotorcycle) throw new Error(`newCar = ${newMotorcycle}`);

    if ('error' in newMotorcycle) {
      return res.status(400).json(newMotorcycle);
    }

    return res.status(201).json(newMotorcycle);
  };

  update = async (
    req: Request<{ id: string }, IMotorcycle>,
    res: Response<IMotorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { params: { id }, body } = req;
    
    if (!/[0-9A-Fa-f]{24}/g.test(id)) {
      return res.status(400).json({ error: this.errors.requiredId });
    }

    if (Object.keys(body).length === 0) {
      return res.status(400).json({ error: this.errors.badRequest });
    }

    const updatedCar = await this.service.update(id, body);

    return !updatedCar 
      ? res.status(404).json({ error: this.errors.notFound }) 
      : res.status(200).json(updatedCar);
  };

  public delete = async (
    req: Request<{ id: string }>,
    res: Response<IMotorcycle | ResponseError>,
  ): Promise<typeof res | void> => {
    const { id } = req.params;
    const twentyFourHexCharacters = /[0-9A-Fa-f]{24}/g;

    if (!twentyFourHexCharacters.test(id)) {
      return res.status(400).json({ error: this.errors.requiredId });
    }

    const car = await this.service.delete(id);
    return !car
      ? res.status(404).json({ error: this.errors.notFound })
      : res.status(204).end();
  };
}
