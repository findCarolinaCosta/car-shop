import { Model, Document } from 'mongoose';
import { Model as IModel } from '../interfaces/ModelInterface';

abstract class MongoModel<T> implements IModel<T> {
  constructor(protected model: Model<T & Document>) {}

  public create = async (obj: T): Promise<T> => this.model.create({ ...obj });

  public read = async (): Promise<T[]> => this.model.find();

  public readOne = async (id: string): Promise<T | null> =>
    this.model.findOne({ _id: id });

  public update = async (id: string, obj: T): Promise<T | null> =>
    this.model.findOneAndUpdate({ _id: id }, { ...obj }, { new: true });

  public delete = async (id: string): Promise<T | null> =>
    this.model.findOneAndDelete({ _id: id });
}

export default MongoModel;