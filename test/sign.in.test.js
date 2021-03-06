import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';

use(chaiHttp);


describe('POST /api/v1/auth/signin', () => {
  describe('When a User tries to login with a User account that does not exists', () => {
    it('should return an error message and status', (done) => {
      const user = {
        email: 'aobikobe1234567@gmail.com', password: 'paswword54',
      };

      chai.request(server)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(404);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Invalid Username and Password combination');
          done();
        });
    });
  });

  describe('When a User tries to login with a User that exists but with the wrong password', () => {
    it('should return an error message and status', (done) => {
      const user = {
        email: 'aobikobe@gmail.com', password: 'pa9iuswword54',
      };

      chai.request(server)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(401);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Invalid Username and Password combination');
          done();
        });
    });
  });

  describe('When a User logs in with acceptable detail', () => {
    it('should return an object with the status and data', (done) => {
      const user = {
        email: 'aobikobe@gmail.com', password: 'password70',
      };

      chai.request(server)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(200);
          expect(res.body).to.have.property('data').to.be.a('object');
          expect(res.body).to.have.property('data').to.have.property('token');
          expect(res.body).to.have.property('data').to.have.property('email');
          expect(res.body).to.have.property('data').to.have.property('first_name');
          expect(res.body).to.have.property('data').to.have.property('last_name');
          done();
        });
    });
  });
});
