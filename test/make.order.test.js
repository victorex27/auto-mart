import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import server from '../src/server';

use(chaiHttp);

describe('POST /api/v1/order', () => {
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

  describe('When a user tries to make a purchase order for a car id that does not exist', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        car_id: 900,
        amount: 1400000,
      };


      chai.request(server)
        .post('/api/v1/order').set('Authorization', token)
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(404);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Car id does not exist');
          done();
        });
    });
  });
  describe('When a user tries to make a purchase order with a non positive integer price', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        car_id: 2,
        amount: 'amaobi',
      };


      chai.request(server)
        .post('/api/v1/order').set('Authorization', token)
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Price must be a positive integer');
          done();
        });
    });
  });
  describe('When a user tries to make a purchase order with no car id', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        amount: 1400000,
      };


      chai.request(server)
        .post('/api/v1/order').set('Authorization', token)
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('No car id supplied');
          done();
        });
    });
  });

  describe('When a user tries to make a purchase order with a non positive integer car id', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        car_id: 'ama',
        amount: 1400000,
      };


      chai.request(server)
        .post('/api/v1/order').set('Authorization', token)
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Car id must be a positive integer');
          done();
        });
    });
  });

  describe('When a user tries to make a purchase order with no amount', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        car_id: 2,
      };


      chai.request(server)
        .post('/api/v1/order').set('Authorization', token)
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Price is not supplied');
          done();
        });
    });
  });

  describe('When a user tries to make a purchase order from user\'s posted adv', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        car_id: 1,
        amount: 1290598,
      };


      chai.request(server)
        .post('/api/v1/order').set('Authorization', token)
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('You cannot make a purchase order for your stock');
          done();
        });
    });
  });

  describe('When a user tries to make a purchase order that already exists', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        car_id: 3,
        amount: 1290598,
      };


      chai.request(server)
        .post('/api/v1/order').set('Authorization', token)
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Purchase Order already exists');
          done();
        });
    });
  });

  describe('When a user tries to make a purchase order with valid detail', () => {
    it('should return an object with the status and data', (done) => {
      const data = {
        car_id: 7,
        amount: 1400000,
      };


      chai.request(server)
        .post('/api/v1/order').set('Authorization', token)
        .send(data)
        .end((err, res) => {
          // console.log('body', res.body);
          expect(res.body).to.have.property('status').to.equals(201);
          expect(res.body).to.have.property('data').to.be.a('object');
          expect(res.body).to.have.property('data').to.have.property('id');
          expect(res.body).to.have.property('data').to.have.property('car_id');
          expect(res.body).to.have.property('data').to.have.property('created_on');
          expect(res.body).to.have.property('data').to.have.property('price_offered');
          expect(res.body).to.have.property('data').to.have.property('price');
          expect(res.body).to.have.property('data').to.have.property('buyer');
          done();
        });
    });
  });
});
