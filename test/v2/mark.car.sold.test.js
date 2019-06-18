import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import server from '../../src/server';


use(chaiHttp);
describe('PACTH /api/v2/car/:carId/sold', () => {
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

  describe('When a user tries to update a car he/she did not post', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .patch('/api/v2/car/2/sold').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('You cannot update an ad you did not create');
          done();
        });
    });
  });

  describe('When a user uses a negative carId', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .patch('/api/v2/car/-2/sold').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Car id must be a positive integer');
          done();
        });
    });
  });

  describe('When a user uses a float numeral id', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .patch('/api/v2/car/2.5/sold').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Car id must be a positive integer');
          done();
        });
    });
  });
  describe('When a user uses an alphabetic car is', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .patch('/api/v2/car/amaobi/sold').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Car id must be a positive integer');
          done();
        });
    });
  });
  describe('When a user tries to use an a status that is not equal to sold', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .patch('/api/v2/car/1/available').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').to.be.equals('You are only allowed to update Car status as sold');
          done();
        });
    });
  });

  describe('When a user tries to use an a status that is not equal to sold', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .patch('/api/v2/car/1/avai').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').to.be.equals('Malformed Path');
          done();
        });
    });
  });

  describe('When a user tries to update a car that is already sold', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .patch('/api/v2/car/8/sold').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Status is sold. Update not performed');
          done();
        });
    });
  });

  describe('When a user tries to update a car that has not been ordered', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .patch('/api/v2/car/9/sold').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('You cannot mark an unordered ad as sold');
          done();
        });
    });
  });

  describe('When a user tries to update a car that has been ordered but is not accepted', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .patch('/api/v2/car/1/sold').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('You cannot mark an unaccepted ad as sold');
          done();
        });
    });
  });

  describe('When a user tries to update a car with an id that does not exists', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .patch('/api/v2/car/90/sold').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(404);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Car id does not exist');
          done();
        });
    });
  });

  describe('When a user tries to update a purchase order with valid detail', () => {
    it('should return an object with the status and data', (done) => {
      chai.request(server)
        .patch('/api/v2/car/10/sold').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(200);
          expect(res.body).to.have.property('data').to.be.a('object');
          expect(res.body).to.have.property('data').to.have.property('id');
          expect(res.body).to.have.property('data').to.have.property('owner');
          expect(res.body).to.have.property('data').to.have.property('createdOn');
          expect(res.body).to.have.property('data').to.have.property('state');
          expect(res.body).to.have.property('data').to.have.property('status').to.equals('sold');
          expect(res.body).to.have.property('data').to.have.property('price');
          expect(res.body).to.have.property('data').to.have.property('manufacturer');
          done();
        });
    });
  });
});
