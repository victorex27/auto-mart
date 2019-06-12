import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import server from '../src/server';


use(chaiHttp);

describe('When user tries to access the application using wrong token', () => {
  const userCredentials = {
    email: 'aobikobe@gmail.com',
    password: 'password70',
  };
  const authenticatedUser = request.agent(server);
  before((done) => {
    authenticatedUser
      .post('/api/v1/auth/signin')
      .send(userCredentials)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        // token = `Bearer ${res.body.data.token}`;
        done();
      });
  });

  describe('When a user tries to make a with no token validation', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        carId: 2,
        amount: 1400000,
      };


      chai.request(server)
        .post('/api/v1/order')
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(403);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Forbidden');
          done();
        });
    });
  });

  describe('When a user tries to make a purchase order with a wrong token', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        carId: 2,
        amount: 1400000,
      };


      chai.request(server)
        .post('/api/v1/order').set('Authorization', 'amaobi')
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(403);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Forbidden');
          done();
        });
    });
  });
});
