import { SafeParseReturnType } from 'zod';
import { ServiceError, Service } from '.';
import CarModel from '../models/CarModel';
import { Model as IModel } from '../interfaces/ModelInterface';
import { Car as ICar } from '../interfaces/CarInterface';
import CarSchema from '../schemas/CarSchema';

class CarService extends Service<ICar> {
  constructor(model: IModel<ICar> = new CarModel()) {
    super(model);
  }

  public create = async (obj: ICar): Promise<ICar | ServiceError | null> => {
    const parsed: SafeParseReturnType<ICar, ICar> = CarSchema.safeParse(obj);

    if (!parsed.success) {
      return { error: parsed.error };
    }
    
    return this.model.create(parsed.data);
  };

  public update = async (id: string, obj: ICar): 
  Promise<ICar | ServiceError | null> => {
    const parsed: SafeParseReturnType<ICar, ICar> = CarSchema.safeParse(obj);

    if (!parsed.success) {
      return { error: parsed.error };
    }

    return this.model.update(id, parsed.data);
  };
}

export default CarService;