import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import server from '../src/server';

use(chaiHttp);

describe('GET /api/v1/order/seller', () => {
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


  describe('Get all purchase order for car', () => {
    it('should return an object with the status and data', (done) => {
      chai.request(server)
        .get('/api/v1/order/seller').set('Authorization', token)
        .send()
        .end((err, res) => {
          if (res.body.data.length !== 0) {
            res.body.data.forEach((element) => {
              expect(element).to.have.property('id');
              expect(element).to.have.property('carId');
              expect(element).to.have.property('createdOn');
              expect(element).to.have.property('priceOffered');
              expect(element).to.have.property('price');
              expect(element).to.have.property('buyer');
            });
          }
          expect(res.body).to.have.property('status').to.equals(200);
          expect(res.body).to.have.property('data').to.be.a('array');

          done();
        });
    });
  });
});
