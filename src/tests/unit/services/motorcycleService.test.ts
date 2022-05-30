import { expect } from 'chai';
import { ZodError } from 'zod';
import MotorcycleModel from '../../../models/MotorcycleModel';
import MotorcycleService from '../../../services/MotorcycleService';
import { motorcycleTest } from './utils/listToTestErrors';
import { motorcycleModelMock } from './utils/motorcycleModelMock';


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

interface ServiceError {
  error: ZodError;
}


describe('Motorcycle service tests', () => {
  describe('CASE success', () => {
    let motorcycleService: MotorcycleService;

    before(() => {
      motorcycleService = new MotorcycleService(motorcycleModelMock as MotorcycleModel)
    })

    it('should be return all motorcycles', async () => {
      const motorcycles = await motorcycleService.read()

      expect(motorcycles).to.be.deep.equal(data)
    })

    it('should return motorcycle by id', async () => {
      const motorcycle = await motorcycleService.readOne(data[0]._id)
      expect(motorcycle).to.be.deep.equal(data[0])
    })

    it('should created motorcycle', async () => {
      const motorcycleCreated = await motorcycleService.create(data[0]);
      expect(motorcycleCreated).to.be.deep.equal(data[0]);
    })

    it('should update motorcycle', async () => {
      const dataUpdate = {
        ...data[0],
        color: "black",
        category: MotorcycleCategory.Custom
      }
      const motorcycleUpdated = await motorcycleService.update(data[0]._id, dataUpdate)

      expect(motorcycleUpdated).to.be.deep.equal(dataUpdate)
    })

    it('should delete motorcycle', async () => {
      const result = await motorcycleService.delete(data[0]._id);
      expect(result).not.be.null
    })
  })

  describe('CASE erros', () => {
    let motorcycleService: MotorcycleService;

    before(() => {
      motorcycleService = new MotorcycleService(motorcycleModelMock as MotorcycleModel)
    })

    it("should not create motorcycle if don't passed correct object infos expected", async () => {
      const modelMotorcycleTest = await motorcycleService.create(motorcycleTest.modelCharacterMin) as ServiceError;
      const yearMinMotorcycleTest = await motorcycleService.create(motorcycleTest.yearMin) as ServiceError;
      const yearMaxMotorcycleTest = await motorcycleService.create(motorcycleTest.yearMax) as ServiceError;
      const colorMotorcycleTest = await motorcycleService.create(motorcycleTest.colorCharacterMin) as ServiceError;
      const buyValueMotorcycleTest = await motorcycleService.create(motorcycleTest.buyValueNotInt) as ServiceError;
      const engineCapacityMinMotorcycleTest = await motorcycleService.create(motorcycleTest.engineCapacityMin) as ServiceError;
      const engineCapacityMaxMotorcycleTest = await motorcycleService.create(motorcycleTest.engineCapacityMax) as ServiceError;

      expect(modelMotorcycleTest).to.have.property('error');
      expect(yearMinMotorcycleTest).to.have.property('error');
      expect(yearMaxMotorcycleTest).to.have.property('error');
      expect(colorMotorcycleTest).to.have.property('error');
      expect(buyValueMotorcycleTest).to.have.property('error');
      expect(engineCapacityMinMotorcycleTest).to.have.property('error');
      expect(engineCapacityMaxMotorcycleTest).to.have.property('error');
    })
  })
});