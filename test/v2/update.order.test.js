import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import server from '../../src/server';


use(chaiHttp);
describe('PACTH /api/v2/order/:orderId/:price', () => {
  const userCredentials = {
    email: 'aobikobe@gmail.com',
    password: 'password70',
  };
  const authenticatedUser = request.agent(server);
  let token;

  before((done) => {
    authenticatedUser
      .post('/api/v2/auth/signin')
      .send(userCredentials)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        token = `Bearer ${res.body.data.token}`;
        done();
      });
  });

  describe('When a user tries to update a purchase order with an alphabetic orderId character', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .patch('/api/v2/order/house/20000000').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Order id must be a positive integer');
          done();
        });
    });
  });

  describe('When a user tries to update a purchase order with an negative orderId character', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .patch('/api/v2/order/-50/20000000').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Order id must be a positive integer');
          done();
        });
    });
  });

  describe('When a user tries to update a purchase order with decimal orderId character', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .patch('/api/v2/order/30.5/20000000').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Order id must be a positive integer');
          done();
        });
    });
  });
  describe('When a user tries to update a purchase order with an alphabetic price', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .patch('/api/v2/order/1/amaobi').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('New Price must be a positive number');
          done();
        });
    });
  });
  describe('When a user tries to update a purchase order with a negative price', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .patch('/api/v2/order/1/-10000').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('New Price must be a positive number');
          done();
        });
    });
  });

  describe('When a user tries to update a purchase order that the user did not make', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .patch('/api/v2/order/2/2000000').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('This purchase order was not made by you');
          done();
        });
    });
  });
  describe('When a user tries to update a purchase order with a non pending status', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .patch('/api/v2/order/12/300000').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('You cannot update the price of a non pending purchase order');
          done();
        });
    });
  });
  describe('When a user tries to update a purchase order with an order id that does not exists', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .patch('/api/v2/order/900/470000').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(404);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Purchase order does not exist');
          done();
        });
    });
  });
  describe('When a user tries to update a purchase order with the same price as the current price', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .patch('/api/v2/order/13/470000').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Current Price is the same as supplied price');
          done();
        });
    });
  });
  describe('When a user tries to update a purchase order with valid detail', () => {
    it('should return an object with the status and data', (done) => {
      chai.request(server)
        .patch('/api/v2/order/1/20000000').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(200);
          expect(res.body).to.have.property('data').to.be.a('object');
          expect(res.body).to.have.property('data').to.have.property('id');
          expect(res.body).to.have.property('data').to.have.property('carId');
          expect(res.body).to.have.property('data').to.have.property('createdOn');
          expect(res.body).to.have.property('data').to.have.property('oldPriceOffered').equal('1400000');
          expect(res.body).to.have.property('data').to.have.property('newPriceOffered').equal('20000000');
          expect(res.body).to.have.property('data').to.have.property('price').equal(2.8);
          expect(res.body).to.have.property('data').to.have.property('buyer');
          done();
        });
    });
  });
});
