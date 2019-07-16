import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import server from '../src/server';


use(chaiHttp);
describe('GET /api/v1/car?status=available&min_price=xxxx&max_price=xxxx', () => {
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

  describe('When a user tries to retrieve all cars but misplaced min and max value', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .get('/api/v1/car?status=available&min_price=50000&max_price=1000').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Min value is greater than Max value');
          done();
        });
    });
  });

  describe('When a user tries to retrieve all cars but min and max value are the same', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .get('/api/v1/car?status=available&min_price=1000&max_price=1000').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Max and Min values cannot be the same');
          done();
        });
    });
  });

  describe('When a user tries to retrieve all cars but one of the price range is not numeric', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .get('/api/v1/car?status=available&min_price=amaobi&max_price=1000').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Price range should be a positive number');
          done();
        });
    });
  });

  describe('When a user tries to retrieve all cars but one of the price range is negative', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .get('/api/v1/car?status=available&min_price=-12&max_price=1000').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Price range should be a positive number');
          done();
        });
    });
  });

  describe('When a user tries to retrieve all cars but one of the price range values is missing', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .get('/api/v1/car?status=available&max_price=1000').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Incorrect number of parameters');
          done();
        });
    });
  });


  describe('When a user tries to retrieve a car id that has been sold', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .get('/api/v1/car?status=8&min_price=500&max_price=100000').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Invalid status parameter');
          done();
        });
    });
  });

  describe('When a user tries to retrieve a car with a proper carId that exists', () => {
    it('should return an object with the status and data', (done) => {
      chai.request(server)
        .get('/api/v1/car?status=available&min_price=500&max_price=100000').set('Authorization', token)
        .send()
        .end((err, res) => {
          if (res.body.data.length !== 0) {
            res.body.data.forEach((element) => {
              expect(element).to.have.property('id');
              expect(element).to.have.property('owner');
              expect(element).to.have.property('created_on');
              expect(element).to.have.property('state');
              expect(element).to.have.property('status').to.equals('available');
              expect(element).to.have.property('price');
              expect(element).to.have.property('manufacturer');
            });
          }
          expect(res.body).to.have.property('status').to.equals(200);
          expect(res.body).to.have.property('data').to.be.a('array');

          done();
        });
    });
  });


  describe('When a user tries to retrieve a car with a proper carId that exists', () => {
    it('should return an object with the status and data', (done) => {
      chai.request(server)
        .get('/api/v1/car?status=available&min_price=1&max_price=4').set('Authorization', token)
        .send()
        .end((err, res) => {
          if (res.body.data.length !== 0) {
            res.body.data.forEach((element) => {
              expect(element).to.have.property('id');
              expect(element).to.have.property('owner');
              expect(element).to.have.property('created_on');
              expect(element).to.have.property('state');
              expect(element).to.have.property('status').to.equals('available');
              expect(element).to.have.property('price');
              expect(element).to.have.property('manufacturer');
            });
          }
          expect(res.body).to.have.property('status').to.equals(200);
          expect(res.body).to.have.property('data').to.be.a('array');


          done();
        });
    });
  });
});
