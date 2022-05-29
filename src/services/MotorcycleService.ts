import { SafeParseReturnType, ZodError } from 'zod';
import { Service } from '.';
import { Model as IModel } from '../interfaces/ModelInterface';
import { Motorcycle as IMotorcycle } from '../interfaces/MotorcycleInterface';
import MotorcycleModel from '../models/MotorcycleModel';
import MotorcycleSchema from '../schemas/MotorcycleSchema';

interface ServiceError {
  error: ZodError;
}

class MotorcycleService extends Service<IMotorcycle> {
  constructor(model: IModel<IMotorcycle> = new MotorcycleModel()) {
    super(model);
  }

  public create = async (obj: IMotorcycle)
  : Promise<IMotorcycle | ServiceError> => {
    const parsed:SafeParseReturnType<IMotorcycle, 
    IMotorcycle> = MotorcycleSchema.safeParse(obj);

    if (!parsed.success) {
      return { error: parsed.error };
    }
    
    return this.model.create(parsed.data);
  };
}

export default MotorcycleService;