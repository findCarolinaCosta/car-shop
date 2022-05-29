import chai, { expect } from 'chai';
import { Document } from 'mongoose';
import Sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import server from '../../../server';
import { Car } from './../../../interfaces/CarInterface';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

interface CarDocument extends Car, Document {}


const data = [{
  _id: "62905e472ab42302a46b5fdf",
  model: "Uno",
  year: 1963,
  color: "blue",
  buyValue: 3501,
  seatsQty: 2,
  doorsQty: 2
}] as (CarDocument & { _id: string; })[]

const dataUpdate = {
  color: 'black',
} as (CarDocument & { _id: string })

const newData = {...data[0], ...dataUpdate} as (CarDocument & { _id: string })

describe('Car controller tests', () => {
  let chaiHttpResponse: Response;
  const carModel = new CarModel();

  describe('CASE success', () => {
    before(async () => {
      Sinon.stub(carModel.model, 'find').resolves(data)
      Sinon.stub(carModel.model, 'findOne').resolves(data[0])
      Sinon.stub(carModel.model, 'create').resolves(data[0])
      Sinon.stub(carModel.model, 'findOneAndUpdate').resolves(newData)
      Sinon.stub(carModel.model, 'findOneAndDelete').resolves(data[0])
    })

    after(() => {
      Sinon.restore();
    });

    it('should be return all cars', async () => {
      chaiHttpResponse = await chai
        .request(server.getApp())
        .get('/cars')
        .then(res => res.body) as Response;

      expect(chaiHttpResponse).to.be.deep.equal(data)
    })

    it('should return car by id', async () => {
      chaiHttpResponse = await chai
        .request(server.getApp())
        .get('/cars/62905e472ab42302a46b5fdf')
        .then(res => res.body) as Response;
    
      expect(chaiHttpResponse).to.be.deep.equal(data[0])
    })

    it('should created car', async () => {
      chaiHttpResponse = await chai
        .request(server.getApp())
        .post('/cars')
        .send(data[0])
        .then(res => res) as Response;
      
      expect(chaiHttpResponse.status).to.be.equal(201)
      expect(chaiHttpResponse.body).to.be.deep.equal(data[0])
    })

    it('should update car', async () => {
      chaiHttpResponse = await chai
        .request(server.getApp())
        .put('/cars/62905e472ab42302a46b5fdf')
        .send(dataUpdate)
        .then(res => res) as Response;

      expect(chaiHttpResponse.status).to.be.equal(200)
      expect(chaiHttpResponse.body).to.deep.equal(newData)
    })

    it('should delete car', async () => {
      chaiHttpResponse = await chai
        .request(server.getApp())
        .delete('/cars/62905e472ab42302a46b5fdf')
        .send(data[0])
        .then(res => res) as Response;
    
      expect(chaiHttpResponse.status).to.be.equal(204)
    })
  })

  describe('CASE erros', () => {

    describe("Don't list a single car by id test errors", () => {
      before(async () => {
        Sinon.stub(carModel.model, 'findOne').resolves(null)
      })
  
      after(() => {
        Sinon.restore();
      });

      it("should return status: 404 and error 'Object not found', if id is invalid", async () => {
        chaiHttpResponse = await chai
          .request(server.getApp())
          .get('/cars/62905e472ab42302a46b5fde')
          .then(res => res) as Response;
        
        expect(chaiHttpResponse.status).to.be.equal(404)
        expect(chaiHttpResponse.body).to.be.deep.equal({ error: 'Object not found' })
      })
  
      it("should return status 400 and error 'Id must have 24 hexadecimal characters', if the id has less than 24 characters", async () => {
        chaiHttpResponse = await chai
          .request(server.getApp())
          .get('/cars/62905e472ab42302a46b')
          .then(res => res) as Response;

        expect(chaiHttpResponse.status).to.be.equal(400)
        expect(chaiHttpResponse.body).to.be.deep.equal({ error: 'Id must have 24 hexadecimal characters' })
      })
    })

    describe("Don't create a car test error", () => { 
      before(async() => {
        Sinon.stub(carModel.model, 'create').resolves(data[0])
      });

      after(() => {
        Sinon.restore();
      });

      it("should return status: 400, if request sent with empty object", async () => {
        chaiHttpResponse = await chai
          .request(server.getApp())
          .post('/cars')
          .then(res => res) as Response;
        
        expect(chaiHttpResponse.status).to.be.equal(400)
        expect(chaiHttpResponse.body).to.have.property('error')
      })

      it("should return status: 400, if request is trying to create a car with less than 2 seats", async () => {
        chaiHttpResponse = await chai
          .request(server.getApp())
          .post('/cars')
          .send({ ...data[0], seatsQty: 1 })
          .then(res => res) as Response;
        
        expect(chaiHttpResponse.status).to.be.equal(400)
        expect(chaiHttpResponse.body).to.have.property('error')
      })

      it("should return status: 400, if request is trying to create a car with less than 2 doors", async () => {
        chaiHttpResponse = await chai
          .request(server.getApp())
          .post('/cars')
          .send({ ...data[0], doorsQty: 1 })
          .then(res => res) as Response;
        
        expect(chaiHttpResponse.status).to.be.equal(400)
        expect(chaiHttpResponse.body).to.have.property('error')
        expect(chaiHttpResponse.body).to.have.property('error')
      })

      it("should return status: 400, if request send without expected properties", async () => {
        chaiHttpResponse = await chai
          .request(server.getApp())
          .post('/cars')
          .send({ 
            model: 'ford',
            year: "2009",
            color: "black",
            buyValue: 35000
           })
          .then(res => res) as Response;
        
        expect(chaiHttpResponse.status).to.be.equal(400)
        expect(chaiHttpResponse.body).to.have.property('error')

        chaiHttpResponse = await chai
          .request(server.getApp())
          .post('/cars')
          .send({ 
            doorQty: 2,
            seatsQty: 2
           })
          .then(res => res) as Response;
        
        expect(chaiHttpResponse.status).to.be.equal(400)
        expect(chaiHttpResponse.body).to.have.property('error')
      })

      it("should return status: 400, if request send expected properties with wrong types", async () => {
        chaiHttpResponse = await chai
          .request(server.getApp())
          .post('/cars')
          .send({ 
            model: 2,
            year: 2009,
            color: "black",
            buyValue: "35000",
            doorQty: "2",
            seatsQty: "2"
           })
          .then(res => res) as Response;
        
        expect(chaiHttpResponse.status).to.be.equal(400)
        expect(chaiHttpResponse.body).to.have.property('error')
      })
    })

    describe("Don't update a car test error", () => { 
      before(async() => {
        Sinon.stub(carModel.model, 'findOneAndUpdate').resolves(null)
      });

      after(() => {
        Sinon.restore();
      });

      it("should return status: 404 and error 'Object not found', if id is invalid", async () => {
        chaiHttpResponse = await chai
          .request(server.getApp())
          .put('/cars/62905e472ab42302a46b5fdf')
          .send({
            color: "black",
           })
          .then(res => res) as Response;
        
        expect(chaiHttpResponse.status).to.be.equal(404)
        expect(chaiHttpResponse.body).to.be.deep.equal({ error: 'Object not found' })
      })

      it("should return status 400 and error 'Id must have 24 hexadecimal characters', if the id has less than 24 characters", async () => {
        chaiHttpResponse = await chai
          .request(server.getApp())
          .put('/cars/62905e472ab42302a4')
          .then(res => res) as Response;

        expect(chaiHttpResponse.status).to.be.equal(400)
        expect(chaiHttpResponse.body).to.be.deep.equal({ error: 'Id must have 24 hexadecimal characters' })
      })

      it("should return status: 400, if request sent with empty object", async () => {
        chaiHttpResponse = await chai
          .request(server.getApp())
          .put('/cars/62905e472ab42302a46b5fdf')
          .then(res => res) as Response;
        
        expect(chaiHttpResponse.status).to.be.equal(400)
        expect(chaiHttpResponse.body).to.deep.equal({ error: 'Bad request' })
      })

    })

    describe("Don't delete a car test error", () => { 
      before(async() => {
        Sinon.stub(carModel.model, 'findOneAndDelete').resolves(null)
      });

      after(() => {
        Sinon.restore();
      });

      it("should return status: 404 and error 'Object not found', if id is invalid", async () => {
        chaiHttpResponse = await chai
          .request(server.getApp())
          .delete('/cars/62905e472ab42302a46b5fdf')
          .then(res => res) as Response;
        
        expect(chaiHttpResponse.status).to.be.equal(404)
        expect(chaiHttpResponse.body).to.be.deep.equal({ error: 'Object not found' })
      })

      it("should return status 400 and error 'Id must have 24 hexadecimal characters', if the id has less than 24 characters", async () => {
        chaiHttpResponse = await chai
          .request(server.getApp())
          .delete('/cars/62905e472ab42302a4')
          .then(res => res) as Response;

        expect(chaiHttpResponse.status).to.be.equal(400)
        expect(chaiHttpResponse.body).to.be.deep.equal({ error: 'Id must have 24 hexadecimal characters' })
      })
    })
  })
});