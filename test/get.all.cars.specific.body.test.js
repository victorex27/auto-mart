import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import server from '../src/server';


use(chaiHttp);
describe('GET /api/v1/car?body_type=coupe', () => {
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
        expect(res.statusCode).to.equal(201);
        token = `Bearer ${res.body.data.token}`;
        done();
      });
  });


  describe('When a user tries to retrieve all used cars ommiting status=available', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .get('/api/v1/car?body_type').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Body type value is missing');
          done();
        });
    });
  });

  describe('When a user tries to retrieve all used cars ommiting status=available', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .get('/api/v1/car?body_type=14').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Body type should only contain alphabet');
          done();
        });
    });
  });

  describe('When a user tries to retrieve all used cars ommiting status=available', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .get('/api/v1/car?status=available&body_type=coupe').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Incorrect number of parameters');
          done();
        });
    });
  });


  describe('When a user tries to retrieve all used cars ommiting status=available', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .get('/api/v1/car?body_type=coupe&status=available').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Incorrect number of parameters');
          done();
        });
    });
  });


  describe('When a user tries to retrieve all used cars with proper detail', () => {
    it('should return an object with the status and data', (done) => {
      chai.request(server)
        .get('/api/v1/car?body_type=coupe').set('Authorization', token)
        .send()
        .end((err, res) => {
          if (res.body.data.length !== 0) {
            res.body.data.forEach((element) => {
              expect(element).to.have.property('id');
              expect(element).to.have.property('owner');
              expect(element).to.have.property('createdOn');
              expect(element).to.have.property('state');
              expect(element).to.have.property('status');
              expect(element).to.have.property('bodyType');
              expect(element).to.have.property('price');
              expect(element).to.have.property('manufacturer');
            });
          }
          expect(res.body).to.have.property('status').to.equals(201);
          expect(res.body).to.have.property('data').to.be.a('array');

          done();
        });
    });
  });
});
