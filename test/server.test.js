import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';

use(chaiHttp);


describe('POST /api/v1/auth/', () => {
  describe('When a User tries to access a wrong path', () => {
    it('should return an error message and status', (done) => {
      const user = {
        email: 'aobikobe1234567@gmail.com', password: 'paswword54',
      };

      chai.request(server)
        .post('/api/v1/auth/')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Malformed Path');
          done();
        });
    });
  });

  describe('GET /api-docs', () => {
    describe('When a user tries to access the api documentation', () => {
      it('should return an object with the status and error', (done) => {
        chai.request(server)
          .get('/api-docs')
          .send()
          .end((err, res) => {
            expect(res).to.have.property('status').equal(200);
            done();
          });
      });
    });
  });
});
