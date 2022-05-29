import { model as createModel, Schema } from 'mongoose';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MongoModel from './MongoModel';

const MotorcycleModelSchema = new Schema<Motorcycle>(
  {
    model: String,
    year: Number,
    color: String,
    buyValue: Number,
    category: String,
  },
  { versionKey: false },
);

class MotorcycleModel extends MongoModel<Motorcycle> {
  constructor(model = createModel('Motorcycles', MotorcycleModelSchema)) {
    super(model);
  }
}

export default MotorcycleModel;