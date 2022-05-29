import { SafeParseReturnType } from 'zod';
import { Service, ServiceError } from '.';
import { Car as ICar } from '../interfaces/CarInterface';
import { Model as IModel } from '../interfaces/ModelInterface';
import CarModel from '../models/CarModel';
import CarSchema from '../schemas/CarSchema';

class CarService extends Service<ICar> {
  constructor(model: IModel<ICar> = new CarModel()) {
    super(model);
  }

  public create = async (obj: ICar): Promise<ICar | ServiceError> => {
    const parsed: SafeParseReturnType<ICar, ICar> = CarSchema.safeParse(obj);

    if (!parsed.success) {
      return { error: parsed.error };
    }
    
    return this.model.create(parsed.data);
  };
}

export default CarService;