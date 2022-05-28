import { Schema, model as createModel } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from './MongoModel';

const CarSchema = new Schema<Car>(
  {
    model: String,
    year: Number,
    color: String,
    buyValue: Number,
    seatsQty: Number,
    doorsQty: Number,
  },
  { versionKey: false },
);

class CarModel extends MongoModel<Car> {
  constructor(model = createModel('Cars', CarSchema)) {
    super(model);
  }
}

export default CarModel;