import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import server from '../src/server';


use(chaiHttp);
describe('GET /api/v1/car/:carId', () => {
  const userCredentials = {
    email: 'aobikobe@gmail.com',
    password: 'password70',
  };
  const authenticatedUser = request.agent(server);
  let token;

  before((done) => {
    authenticatedUser
      .post('/api/v1/auth/signin')
      .send(userCredentials)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        token = `Bearer ${res.body.data.token}`;
        done();
      });
  });

  describe('When a user tries to retrieve a car with alphabetic car id', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .get('/api/v1/car/amaobi').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Car id must be a positive integer');
          done();
        });
    });
  });

  describe('When a user tries to retrieve a car id with negative value', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .get('/api/v1/car/-2').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Car id must be a positive integer');
          done();
        });
    });
  });

  describe('When a user tries to retrieve a car id that is type float', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .get('/api/v1/car/2.5').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Car id must be a positive integer');
          done();
        });
    });
  });
  describe('When a user tries to retrieve a car id that does not exist', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .get('/api/v1/car/90').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(404);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Car id does not exist');
          done();
        });
    });
  });


  describe('When a user tries to retrieve a car with a proper carId that exists', () => {
    it('should return an object with the status and data', (done) => {
      chai.request(server)
        .get('/api/v1/car/1').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(200);
          expect(res.body).to.have.property('data').to.be.a('object');
          expect(res.body).to.have.property('data').to.have.property('id');
          expect(res.body).to.have.property('data').to.have.property('owner');
          expect(res.body).to.have.property('data').to.have.property('createdOn');
          expect(res.body).to.have.property('data').to.have.property('state');
          expect(res.body).to.have.property('data').to.have.property('status').to.equals('available');
          expect(res.body).to.have.property('data').to.have.property('price');
          expect(res.body).to.have.property('data').to.have.property('manufacturer');
          done();
        });
    });
  });
});
