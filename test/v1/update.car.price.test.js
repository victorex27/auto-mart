import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import server from '../../src/server';


use(chaiHttp);
describe('PACTH /api/v1/car/:carId/:price', () => {
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

  describe('When a user tries to update a car he/she did not post', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .patch('/api/v1/car/2/1000').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('You cannot update an ad you did not create');
          done();
        });
    });
  });


  describe('When a user tries to update a car with an id that does not exists', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .patch('/api/v1/car/90/10000').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(404);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Car id does not exists');
          done();
        });
    });
  });

  describe('When a user tries to update a car that has been marked as sold', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .patch('/api/v1/car/13/10000').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Car is already marked as sold. You cannot update price');
          done();
        });
    });
  });

  describe('When a user tries to update a car advert with valid detail', () => {
    it('should return an object with the status and data', (done) => {
      chai.request(server)
        .patch('/api/v1/car/14/1000').set('Authorization', token)
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
