import { expect } from 'chai';
import { ZodError } from 'zod';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { carModelMock } from './utils/carModelMock';
import { carTest } from './utils/listToTestErrors';

interface ICar {
  _id: string;
  model: string;
  year: number;
  color: string;
  buyValue: number;
  seatsQty: number;
  doorsQty: number;
}

const data: ICar[] = [{
  _id: "62905e472ab42302a46b5fdf",
  model: "Uno",
  year: 1963,
  color: "blue",
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2
}]

interface ServiceError {
  error: ZodError;
}


describe('Car service tests', () => {
  describe('CASE success', () => {
    let carService: CarService;

    before(() => {
      carService = new CarService(carModelMock as CarModel)
    })

    it('should be return all cars', async () => {
      const cars = await carService.read()

      expect(cars).to.be.deep.equal(data)
    })

    it('should return car by id', async () => {
      const car = await carService.readOne(data[0]._id)
      expect(car).to.be.deep.equal(data[0])
    })

    it('should created car', async () => {
      const car = await carService.create(data[0]);
      expect(car).to.be.deep.equal(data[0]);
    })

    it('should update car', async () => {
      const dataUpdate = {
        ...data[0],
        color: "black"
      }
      const car = await carService.update(data[0]._id, dataUpdate)

      expect(car).to.be.deep.equal(dataUpdate)
    })

    it('should delete car', async () => {
      const car = await carService.delete(data[0]._id);
      expect(car).not.be.null
    })
  })

  describe('CASE erros', () => {
    let carService: CarService;

    before(() => {
      carService = new CarService(carModelMock as CarModel)
    })

    it("should not create car if don't passed correct object infos expected", async () => {
      const modelCarTest = await carService.create(carTest.modelCharacterMin) as ServiceError;
      const yearMinCarTest = await carService.create(carTest.yearMin) as ServiceError;
      const yearMaxCarTest = await carService.create(carTest.yearMax) as ServiceError;
      const colorCarTest = await carService.create(carTest.colorCharacterMin) as ServiceError;
      const buyValueCarTest = await carService.create(carTest.buyValueNotInt) as ServiceError;
      const doorsMinCarTest = await carService.create(carTest.doorsMin) as ServiceError;
      const doorsMaxCarTest = await carService.create(carTest.doorsMax) as ServiceError;
      const seatsMinCarTest = await carService.create(carTest.doorsMin) as ServiceError;
      const seatsMaxCarTest = await carService.create(carTest.doorsMax) as ServiceError;

      expect(modelCarTest).to.have.property('error');
      expect(yearMinCarTest).to.have.property('error');
      expect(yearMaxCarTest).to.have.property('error');
      expect(colorCarTest).to.have.property('error');
      expect(buyValueCarTest).to.have.property('error');
      expect(doorsMinCarTest).to.have.property('error');
      expect(doorsMaxCarTest).to.have.property('error');
      expect(seatsMinCarTest).to.have.property('error');
      expect(seatsMaxCarTest).to.have.property('error');
    })
  })
});