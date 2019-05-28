import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import server from '../src/server';

use(chaiHttp);

describe('POST /api/v1/flag', () => {
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

  describe('When a user tries to make a flag without reason', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        carId: 2,
        description: 'big description 2018',
      };


      chai.request(server)
        .post('/api/v1/flag').set('Authorization', token)
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Reason Field is missing');
          done();
        });
    });
  });

  describe('When a user tries to make a flag without description', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        carId: 2,
        reason: 'super reason',
      };


      chai.request(server)
        .post('/api/v1/flag').set('Authorization', token)
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Description Field is missing');
          done();
        });
    });
  });

  describe('When a user tries to make a flag with no carId field', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        reason: 'super reason',
        description: 'big description 2018',
      };


      chai.request(server)
        .post('/api/v1/flag').set('Authorization', token)
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('No car id supplied');
          done();
        });
    });
  });


  describe('When a user tries to make a flag with a car id that is not an a postive integer', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        carId: 'amaobi',
        reason: 'super reason',
        description: 'big description 2018',
      };


      chai.request(server)
        .post('/api/v1/flag').set('Authorization', token)
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Car id must be a positive integer');
          done();
        });
    });
  });

  describe('When a user tries to make a flag with a car id that does not exist', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        carId: 99,
        reason: 'super reason',
        description: 'big description 2018',
      };


      chai.request(server)
        .post('/api/v1/flag').set('Authorization', token)
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Car id does not exist');
          done();
        });
    });
  });

  describe('When a user tries to make a flag with car id field that belongs to user', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        carId: 1,
        reason: 'super reason',
        description: 'big description 2018',
      };


      chai.request(server)
        .post('/api/v1/flag').set('Authorization', token)
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('You cannot report your own ad');
          done();
        });
    });
  });


  describe('When a user tries to upload a new car with valid detail', () => {
    it('should return an object with the status and data', (done) => {
      const data = {
        carId: 2,
        reason: 'super reason',
        description: 'big description 2018',
      };


      chai.request(server)
        .post('/api/v1/flag').set('Authorization', token)
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(201);
          expect(res.body).to.have.property('data').to.be.a('object');
          expect(res.body).to.have.property('data').to.have.property('id');
          expect(res.body).to.have.property('data').to.have.property('user');
          expect(res.body).to.have.property('data').to.have.property('createdOn');
          expect(res.body).to.have.property('data').to.have.property('carId');
          expect(res.body).to.have.property('data').to.have.property('reason');
          expect(res.body).to.have.property('data').to.have.property('description');
          done();
        });
    });
  });
});