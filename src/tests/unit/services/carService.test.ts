import { expect } from 'chai';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { carModelMock } from './utils/carModelMock';
import listToTestErrors from './utils/listToTestErrors';
import { ZodError } from 'zod';

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
      const modelCarTest = await carService.create(listToTestErrors.modelCharacterMin) as ServiceError;
      const yearMinCarTest = await carService.create(listToTestErrors.yearMin) as ServiceError;
      const yearMaxCarTest = await carService.create(listToTestErrors.yearMax) as ServiceError;
      const colorCarTest = await carService.create(listToTestErrors.colorCharacterMin) as ServiceError;
      const buyValueCarTest = await carService.create(listToTestErrors.buyValueNotInt) as ServiceError;
      const doorsMinCarTest = await carService.create(listToTestErrors.doorsMin) as ServiceError;
      const doorsMaxCarTest = await carService.create(listToTestErrors.doorsMax) as ServiceError;
      const seatsMinCarTest = await carService.create(listToTestErrors.doorsMin) as ServiceError;
      const seatsMaxCarTest = await carService.create(listToTestErrors.doorsMax) as ServiceError;

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

    it("should not update car if don't passed correct object infos expected", async () => {
      const modelCarTest = await carService.update(data[0]._id, listToTestErrors.modelCharacterMin) as ServiceError;
      const yearMinCarTest = await carService.update(data[0]._id, listToTestErrors.yearMin) as ServiceError;
      const yearMaxCarTest = await carService.update(data[0]._id, listToTestErrors.yearMax) as ServiceError;
      const colorCarTest = await carService.update(data[0]._id, listToTestErrors.colorCharacterMin) as ServiceError;
      const buyValueCarTest = await carService.update(data[0]._id, listToTestErrors.buyValueNotInt) as ServiceError;
      const doorsMinCarTest = await carService.update(data[0]._id, listToTestErrors.doorsMin) as ServiceError;
      const doorsMaxCarTest = await carService.update(data[0]._id, listToTestErrors.doorsMax) as ServiceError;
      const seatsMinCarTest = await carService.update(data[0]._id, listToTestErrors.doorsMin) as ServiceError;
      const seatsMaxCarTest = await carService.update(data[0]._id, listToTestErrors.doorsMax) as ServiceError;
      
      expect('error' in modelCarTest).to.be.true;
      expect('error' in modelCarTest).to.be.true;
      expect('error' in yearMinCarTest).to.be.true;
      expect('error' in yearMaxCarTest).to.be.true;
      expect('error' in colorCarTest).to.be.true;
      expect('error' in buyValueCarTest).to.be.true;
      expect('error' in doorsMinCarTest).to.be.true;
      expect('error' in doorsMaxCarTest).to.be.true;
      expect('error' in seatsMinCarTest).to.be.true;
      expect('error' in seatsMaxCarTest).to.be.true;
    })
  })
});