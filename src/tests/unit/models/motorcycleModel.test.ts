import { expect } from 'chai';
import Sinon from 'sinon';
import MotorcycleModel from '../../../models/MotorcycleModel';
import { MongooseMock } from './utils/MongooseMock';

enum MotorcycleCategory {
  Custom = "Custom",
  Street = "Street",
  Trail = "Trail"
}

interface IMotorcycle {
  _id: string;
  model: string;
  year: number;
  color: string;
  buyValue: number;
  category: MotorcycleCategory,
  engineCapacity: number,
}


const data: IMotorcycle[] = [
  {
    _id: "62905e472ab42302a46b5fdd",
    model: "Honda CG Titan 125",
    year: 1963,
    color: "red",
    buyValue: 3500,
    category: MotorcycleCategory.Custom,
    engineCapacity: 2
  }
]

describe('Motorcycle model test', () => {
  let motorcycleModel: MotorcycleModel;
  const motorcycelModelSinon = new MotorcycleModel();

  describe('Case Success', () => { 
    before(() => {
      Sinon.stub(motorcycelModelSinon.model, 'find').resolves(data as any)
      motorcycleModel = new MotorcycleModel(MongooseMock as any)
    })

    after(() => {
      Sinon.restore();
    })

    it('should be create motorcycle with success', async () => {
      const motorcycleCreated = await motorcycleModel.create(data[0]);
      expect(motorcycleCreated).to.be.deep.equal(data[0]);
    })

    it('should return all motorcycles', async () => {
      const motorcycles = await motorcycelModelSinon.read()
      expect(motorcycles).to.be.deep.equal(data)
    })

    it('should find motorcycle by id', async () => {
      const motorcycle = await motorcycleModel.readOne(data[0]._id)
      expect(motorcycle).to.be.deep.equal(data[0])
    })


    it('should update motorcycle info passed', async () => {
      const dataUpdate = {
        ...data[0],
        color: "black",
        category: MotorcycleCategory.Street
      }
      const newMotorcycle = await motorcycleModel.update(data[0]._id, dataUpdate)
      
      expect(newMotorcycle).to.be.deep.equal(dataUpdate)
    })

    it('should delete motorcycle with success', async () => {
      const result = await motorcycleModel.delete(data[0]._id);
      expect(result).not.be.null
    })
  })

  describe('Case errors', () => {
    let motorcycleModel: MotorcycleModel;
    
    before(() => {
      motorcycleModel = new MotorcycleModel(MongooseMock as any)
    })

    it('should return null if passed incorrect id when read by id', async () => {
      const result = await motorcycleModel.readOne('')
      expect(result).to.be.null
    })

    it('should not update car if passed incorrect id', async () => {
      const dataUpdate = {
        ...data[0],
        color: "black"
      }
      const car = await motorcycleModel.update('', dataUpdate)
      expect(car).to.be.null
    })

    it('should not delete car if passed incorrect id', async () => {
      const car = await motorcycleModel.delete(data[0]._id);
      expect(car).not.be.null
    })
  })
})