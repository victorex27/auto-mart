import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import server from '../../src/server';


use(chaiHttp);
describe('GET /api/v2/car?status=available&manufacturer=dodge', () => {
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


  describe('When a user tries to retrieve all used cars by a manufacturer with no availability status set', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .get('/api/v2/car?manufacturer=dodge').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Availability Status is not set');
          done();
        });
    });
  });

  describe('When a user tries to retrieve all used cars by a manufacturer  with a non alphabetic value', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .get('/api/v2/car?status=available&manufacturer=112').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Manufacturer should only contain alphabet');
          done();
        });
    });
  });

  describe('When a user tries to retrieve all used cars by a manufacturer  ommiting the value for manufacturer', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .get('/api/v2/car?status=available&manufacturer').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Manufacturer value is missing');
          done();
        });
    });
  });


  describe('When a user tries to retrieve all used cars by a manufacturer  with proper detail', () => {
    it('should return an object with the status and data', (done) => {
      chai.request(server)
        .get('/api/v2/car?status=available&manufacturer=dodge').set('Authorization', token)
        .send()
        .end((err, res) => {
          if (res.body.data.length !== 0) {
            res.body.data.forEach((element) => {
              expect(element).to.have.property('id');
              expect(element).to.have.property('owner');
              expect(element).to.have.property('createdOn');
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
