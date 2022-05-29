import { Request, Response } from 'express';
import { ResponseError, Controller, RequestWithBody } from './index';
import { Car as ICar } from '../interfaces/CarInterface';
import CarService from '../services/CarService';

export default class CarController extends Controller<ICar> {
  constructor(
    service = new CarService(),
    route = '/cars',
  ) {
    super(service, route);
    this.$route = route;
  }

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<ICar | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const twentyFourHexCharacters = /[0-9A-Fa-f]{24}/g;

    if (!twentyFourHexCharacters.test(id)) {
      return res.status(400).json({ error: this.errors.requiredId });
    }

    const car = await this.service.readOne(id);

    if (!car) {
      return res.status(404).json({ error: this.errors.notFound });
    }
    return res.status(200).json(car);
  };

  public create = async (
    req: RequestWithBody<ICar>,
    res: Response<ICar | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;

    if (!body) return res.status(400).json({ error: this.errors.badRequest });
      
    const newCar = await this.service.create(body);

    if (!newCar) throw new Error(`newCar = ${newCar}`);

    if ('error' in newCar) {
      return res.status(400).json(newCar);
    }

    return res.status(201).json(newCar);
  };

  update = async (
    req: Request<{ id: string }, ICar>,
    res: Response<ICar | ResponseError>,
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
    res: Response<ICar | ResponseError>,
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
