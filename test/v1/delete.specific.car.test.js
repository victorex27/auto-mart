import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import server from '../../src/server';


use(chaiHttp);
describe('DELETE /api/v1/car/:carId', () => {
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

  describe('When a user tries to delete a car that does not eixsts', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .delete('/api/v1/car/900').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(404);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Car id does not exist');
          done();
        });
    });
  });

  describe('When a user tries to delete a car id that is a negative number', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .delete('/api/v1/car/-1').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Car id must be a positive integer');
          done();
        });
    });
  });

  describe('When a user tries to delete a car with alphabetic car id', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .delete('/api/v1/car/amaobi').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Car id must be a positive integer');
          done();
        });
    });
  });


  describe('When an admin tries to delete a car that exists', () => {
    it('should return an object with the status and data', (done) => {
      chai.request(server)
        .delete('/api/v1/car/11').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(200);
          expect(res.body).to.have.property('data').to.be.equals('Car Ad successfully deleted');

          done();
        });
    });
  });
});


describe('DELETE /api/v1/car/:carId', () => {
  const userCredentials = {
    email: 'victorvents@hotmail.com',
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

  describe('When a user that is not an admin tries to delete a car advert', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .delete('/api/v1/car/12').set('Authorization', token)
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(403);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Only admins are allowed to delete car adverts');
          done();
        });
    });
  });
});
