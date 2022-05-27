import { Request, Response } from 'express';
import { ResponseError, Controller, RequestWithBody } from './index';
import { Car as ICar } from '../interfaces/CarInterface';
import CarService from '../services/CarService';

const twentyFourHexCharacters = /[0-9A-Fa-f]{24}/g;

export default class CarController extends Controller<ICar> {
  private $route: string;

  constructor(
    service = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<ICar | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;

    if (!twentyFourHexCharacters.test(id)) {
      return res.status(400).json({ error: this.errors.requiredId });
    }

    try {
      const car = await this.service.readOne(id);

      if (!car) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      return res.status(200).json(car);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  public create = async (
    req: RequestWithBody<ICar>,
    res: Response<ICar | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { body } = req;
      const newCar = await this.service.create(body);

      if (!newCar) {
        return res.status(400).json({ error: this.errors.badRequest });
      }
      if ('error' in newCar) {
        return res.status(400).json(newCar);
      }
      return res.status(201).json(newCar);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: Request<{ id: string }, ICar>,
    res: Response<ICar | ResponseError>,
  ): Promise<typeof res> => {
    const { params: { id }, body } = req;
    if (!twentyFourHexCharacters.test(id)) {
      return res.status(400).json({ error: this.errors.requiredId });
    }

    if (Object.keys(body).length === 0) {
      return res.status(400).json({ error: this.errors.badRequest });
    }

    try {
      const updatedCar = await this.service.update(id, body);

      return !updatedCar 
        ? res.status(404).json({ error: this.errors.notFound }) 
        : res.status(200).json(updatedCar);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  public async delete(
    req: Request<{ id: string }>,
    res: Response<ICar | ResponseError>,
  ): Promise<typeof res | void> {
    const { id } = req.params;
    if (!twentyFourHexCharacters.test(id)) {
      return res.status(400).json({ error: this.errors.requiredId });
    }

    try {
      const car = await this.service.delete(id);
      return !car
        ? res.status(404).json({ error: this.errors.notFound })
        : res.status(204).end();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: this.errors.internal });
    }
  }
}
