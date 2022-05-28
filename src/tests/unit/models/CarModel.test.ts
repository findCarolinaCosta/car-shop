import { MongooseMock } from './utils/MongooseMock';
import { expect } from 'chai';
import {Model} from 'mongoose';
import CarModel from '../../../models/CarModel';

interface ICar {
  _id: string;
  model: string;
  year: number;
  color: string;
  buyValue: number;
  seatsQty: number;
  doorsQty: number;
}


const data: ICar[] = [
  {
    _id: "62905e472ab42302a46b5fdf",
    model: "Uno",
    year: 1963,
    color: "blue",
    buyValue: 3500,
    seatsQty: 2,
    doorsQty: 2
  }
]

describe('Car model test', () => {
  let carModel: CarModel;
  describe('Case Success', () => { 
    before(() => {
      carModel = new CarModel(MongooseMock as any)
    })

    it('should be create car with success', async () => {
      const car = await carModel.create(data[0]);
      expect(car).to.be.deep.equal(data[0]);
    })

    it('should return all cars', async () => {
      const car = await carModel.read()
      expect(car).to.be.deep.equal(data)
    })

    it('should find car by id', async () => {
      const car = await carModel.readOne(data[0]._id)
      expect(car).to.be.deep.equal(data[0])
    })


    it('should update car info passed', async () => {
      const dataUpdate = {
        ...data[0],
        color: "black"
      }
      const car = await carModel.update(data[0]._id, dataUpdate)
      expect(car).to.be.deep.equal(dataUpdate)
    })

    it('should delete car with success', async () => {
      const car = await carModel.delete(data[0]._id);
      expect(car).not.be.null
    })
  })

  describe('Case errors', () => { 
    before(() => {
      carModel = new CarModel(MongooseMock as any)
    })

    it('should return null if passed incorrect id when read by id', async () => {
      const car = await carModel.readOne('')
      expect(car).to.be.null
    })

    it('should not update car if passed incorrect id', async () => {
      const dataUpdate = {
        ...data[0],
        color: "black"
      }
      const car = await carModel.update('', dataUpdate)
      expect(car).to.be.null
    })

    it('should not delete car if passed incorrect id', async () => {
      const car = await carModel.delete(data[0]._id);
      expect(car).not.be.null
    })
  })
})