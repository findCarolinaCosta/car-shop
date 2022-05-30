import { expect } from 'chai';
import Sinon from 'sinon';
import MotorcycleController from '../../../controllers/MotorcycleController';
import MotorcycleService from '../../../services/MotorcycleService';
import { motorcycleModelMock } from '../services/utils/motorcycleModelMock';

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

enum ControllerErrors {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
  requiredId = 'Id must have 24 hexadecimal characters',
  badRequest = 'Bad request',
}

describe('Motocycly controller test', () => { 
  describe('CASE success', () => { 
    let request = {} as any;
    let response = { status: {}, json: {} } as any;
    
    let motorcycleService: MotorcycleService;
    let motorcycleController: MotorcycleController;

    before(() => {
      motorcycleService = new MotorcycleService(motorcycleModelMock)
      motorcycleController = new MotorcycleController(motorcycleService)

      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns(response);
      response.end = Sinon.stub().returns(response);
    });

    after(() => {
      Sinon.restore();
      response.body = {}
      response.params = {}
    });

    it('should return all motorcycles', async () => {
      await motorcycleController.read(request, response)

      expect(response.status.calledWith(200)).to.be.true
      expect(response.json.calledWith(data)).to.be.true
    })

    it('should create motorcycle', async () => {
      request = { body: data[0] }
      await motorcycleController.create(request, response)
      
      expect(response.status.calledWith(201)).to.be.true
      expect(response.json.calledWith(data[0])).to.be.true
    })

    it('should return motorcycle by id', async () => {
      request = { params: {id: data[0]._id} }
      await motorcycleController.readOne(request, response)
      
      expect(response.status.calledWith(200)).to.be.true
      expect(response.json.calledWith(data[0])).to.be.true
    })

    it('should update motorcycle', async () => {
      const dataUpdate = {
        ...data[0],
        color: "black",
        category: MotorcycleCategory.Custom
      }
      request = { params: {id: data[0]._id}, body: dataUpdate }
      await motorcycleController.update(request, response)
      
      expect(response.status.calledWith(200)).to.be.true
      expect(response.json.calledWith(dataUpdate)).to.be.true
    })

    it('should delete motorcycle', async () => {
      request = { params: {id: data[0]._id} }
      await motorcycleController.delete(request, response)
      
      expect(response.status.calledWith(204)).to.be.true
      expect(response.end.calledWith()).to.be.true
    })
  })

  describe('CASE erros', () => { 
    let request = {} as any;
    let response = { status: {}, json: {} } as any;
    
    let motorcycleService: MotorcycleService;
    let motorcycleController: MotorcycleController;

    before(() => {
      motorcycleService = new MotorcycleService(motorcycleModelMock)
      motorcycleController = new MotorcycleController(motorcycleService)

      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns(response);
      response.end = Sinon.stub().returns(response);
    });

    after(() => {
      Sinon.restore();
      response.body = {}
      response.params = {}
    });

    it("should return error 400 if the request receives an empty object", async () => {
      await motorcycleController.create(request, response)
      
      expect(response.status.calledWith(400)).to.be.true
      expect(response.json.calledWith({ error: ControllerErrors.badRequest })).to.be.true
    })

    it("should return error 400 when trying to create a motorcycle with a category other than Street, Custom or Trail", async () => {
      request = { body: {
        ...data[0],
        category: "Wrong category"
      } }
      await motorcycleController.create(request, response)
      
      
      expect(response.status.calledWith(400)).to.be.true
    })

    it("should returns error 400 when trying to create a motorcycle with category different from string", async () => {
      request = { body: {
        ...data[0],
        category: 2
      } }
      await motorcycleController.create(request, response)
      
      
      expect(response.status.calledWith(400)).to.be.true
    })

    it("should returns error 400 when trying to create a motorcycle with engineCapacity less than or equal to zero", async () => {
      request = { body: {
        ...data[0],
        engineCapacity: 0
      } }
      await motorcycleController.create(request, response)
      
      
      expect(response.status.calledWith(400)).to.be.true
    })

    it("should returns error 400 when trying to create a motorcycle with engineCapacity greater than 2500", async () => {
      request = { body: {
        ...data[0],
        engineCapacity: 3000
      } }
      await motorcycleController.create(request, response)
      
      
      expect(response.status.calledWith(400)).to.be.true
    })

    it("should returns error 400 when trying to create a moto without model, year, color and buyValue", async () => {
      request = { body: 
        {
          category: MotorcycleCategory.Custom,
          engineCapacity: 2
        }}
      await motorcycleController.create(request, response)
      
      
      expect(response.status.calledWith(400)).to.be.true
    })

    it("should returns error 400 when trying to create a moto without category and engineCapacity", async () => {
      request = { body: 
        {
          model: "Honda CG Titan 125",
          year: 1963,
          color: "red",
          buyValue: 3500,
        }}
      await motorcycleController.create(request, response)
      
      
      expect(response.status.calledWith(400)).to.be.true
    })

    it("should not be possible to create a motorcycle if the model, year, color, buyValue, category and engineCapacity attributes are of wrong types", async () => {
      request = { body: 
        {
          model: 2,
          year: "1963",
          color: 1,
          buyValue: "3500",
          category: "any",
          engineCapacity: "2"
        }}
      await motorcycleController.create(request, response)
      
      
      expect(response.status.calledWith(400)).to.be.true
    })

    it("should return status 400 and error 'Id must have 24 hexadecimal characters' if the id has less than 24 characters", async () => {
      request = { params: {id: "62905e472ab42302a"} }
      await motorcycleController.readOne(request, response)
      
      expect(response.status.calledWith(400)).to.be.true
      expect(response.json.calledWith({ error: ControllerErrors.requiredId})).to.be.true
    })

    it("should return status 404  and error Object not found if get by id is invalid", async () => {
      request = { params: {id: "62905e472ab42302a46b5fd3"} } 
      
      await motorcycleController.readOne(request, response)
      
      expect(response.status.calledWith(404)).to.be.true
      expect(response.json.calledWith({ error: ControllerErrors.notFound})).to.be.true
    })

    it("should return status 404  and error 'Id must have 24 hexadecimal characters' if try update with id has less than 24 characters", async () => {
      request = { params: {id: "62905e472ab42302a"}, body: {
        year: 2000,
        category: MotorcycleCategory.Street,
      }}
      
      await motorcycleController.update(request, response)
      
      expect(response.status.calledWith(400)).to.be.true
      expect(response.json.calledWith({ error: ControllerErrors.requiredId})).to.be.true
    })

    it(`should return status 400  and error ${ControllerErrors.badRequest} if try update without body`, async () => {
      request = { params: {id: "62905e472ab42302a46b5fdd"}, body: {} }
      
      await motorcycleController.update(request, response)
      
      expect(response.status.calledWith(400)).to.be.true
      expect(response.json.calledWith({ error: ControllerErrors.badRequest})).to.be.true
    })

    it("should return status 404  and error Object not found if try update with id is invalid", async () => {
      request = { params: {id: "62905e472ab42302a46b5fd3"}, body: {
        year: 2000,
        category: MotorcycleCategory.Street,
      } }
      
      await motorcycleController.update(request, response)
      
      expect(response.status.calledWith(404)).to.be.true
      expect(response.json.calledWith({ error: ControllerErrors.notFound})).to.be.true
    })

    it(`should return status 400  and error ${ControllerErrors.requiredId} if try delete with id has less than 24 characters`, async () => {
      request = { params: {id: "62905e472ab"}, body: {} }
      
      await motorcycleController.delete(request, response)
      
      expect(response.status.calledWith(404)).to.be.true
      expect(response.json.calledWith({ error: ControllerErrors.requiredId})).to.be.true
    })

    it("should return status 404  and error Object not found if try delete with id is invalid", async () => {
      request = { params: {id: "62905e472ab42302a46b5fd3"}, body: {} }
      
      await motorcycleController.delete(request, response)
      
      expect(response.status.calledWith(404)).to.be.true
      expect(response.json.calledWith({ error: ControllerErrors.notFound})).to.be.true
    })
  })
})