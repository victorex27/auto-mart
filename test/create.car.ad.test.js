import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import server from '../src/server';

use(chaiHttp);

describe('POST /api/v1/car', () => {
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

  describe('When a user tries to make a car ad with no state field supplied', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        price: 1200000,
        model: '2018',
        bodyType: 'coupe',
        manufacturer: 'maclaren',
      };


      chai.request(server)
        .post('/api/v1/car').set('Authorization', token)
        .field('Content-Type', 'multipart/form-data')
        .field(data)
        .attach('dataFile', 'test/img/img1.jpg')
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('State Field is missing');
          done();
        });
    });
  });

  describe('When a user tries to make a car ad with an invalid state field type', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        state: 45,
        price: 1200000,
        model: '2018',
        bodyType: 'coupe',
        manufacturer: 'maclaren',
      };


      chai.request(server)
        .post('/api/v1/car').set('Authorization', token)
        .field('Content-Type', 'multipart/form-data')
        .field(data)
        .attach('dataFile', 'test/img/img1.jpg')
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('State Field must be new or old');
          done();
        });
    });
  });

  describe('When a user tries to make a car ad with no price field supplied', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        state: 'new',
        model: '2018',
        bodyType: 'coupe',
        manufacturer: 'maclaren',
      };


      chai.request(server)
        .post('/api/v1/car').set('Authorization', token)
        .field('Content-Type', 'multipart/form-data')
        .field(data)
        .attach('dataFile', 'test/img/img1.jpg')
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Price Field does not exist');
          done();
        });
    });
  });

  describe('When a user tries to make a car ad with invalid price field type', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        state: 'new',
        price: 'amaobi',
        model: '2018',
        bodyType: 'coupe',
        manufacturer: 'maclaren',
      };


      chai.request(server)
        .post('/api/v1/car').set('Authorization', token)
        .field('Content-Type', 'multipart/form-data')
        .field(data)
        .attach('dataFile', 'test/img/img1.jpg')
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Price Field must be a positive number');
          done();
        });
    });
  });

  describe('When a user tries to make a car ad with no model field', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        state: 'new',
        price: 1200000,
        bodyType: 'coupe',
        manufacturer: 'maclaren',
      };


      chai.request(server)
        .post('/api/v1/car').set('Authorization', token)
        .field('Content-Type', 'multipart/form-data')
        .field(data)
        .attach('dataFile', 'test/img/img1.jpg')
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Model Field does not exist');
          done();
        });
    });
  });

  describe('When a user tries to make a car ad with no body type field supplied', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        state: 'new',
        price: 1200000,
        model: '2018',
        manufacturer: 'maclaren',
      };


      chai.request(server)
        .post('/api/v1/car').set('Authorization', token)
        .field('Content-Type', 'multipart/form-data')
        .field(data)
        .attach('dataFile', 'test/img/img1.jpg')
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Body Type Field does not exist');
          done();
        });
    });
  });

  describe('When a user tries to make a car ad with no manufacturer field supplied', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        state: 'new',
        price: 1200000,
        model: '2018',
        bodyType: 'coupe',
      };


      chai.request(server)
        .post('/api/v1/car').set('Authorization', token)
        .field('Content-Type', 'multipart/form-data')
        .field(data)
        .attach('dataFile', 'test/img/img1.jpg')
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Manufacturer Field is missing');
          done();
        });
    });
  });

  describe('When a user tries to make a car ad with no image supplied', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        state: 'new',
        price: 1200000,
        model: '2018',
        bodyType: 'coupe',
        manufacturer: 'maclaren',
      };


      chai.request(server)
        .post('/api/v1/car').set('Authorization', token)
        .field('Content-Type', 'multipart/form-data')
        .field(data)
        .attach('dataFile', '')
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string');
          done();
        });
    });
  });

  describe('When a user tries to make a car ad with missing dataFile field', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        state: 'new',
        price: 1200000,
        model: '2018',
        bodyType: 'coupe',
        manufacturer: 'maclaren',
      };


      chai.request(server)
        .post('/api/v1/car').set('Authorization', token)
        .field('Content-Type', 'multipart/form-data')
        .field(data)
        .attach('datasFile', 'test/img/img1.jpg')
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string');
          done();
        });
    });
  });

  describe('When a user tries to make a car ad with an image size larger than 400kb', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        state: 'new',
        price: 1200000,
        model: '2018',
        bodyType: 'coupe',
        manufacturer: 'maclaren',
      };


      chai.request(server)
        .post('/api/v1/car').set('Authorization', token)
        .field('Content-Type', 'multipart/form-data')
        .field(data)
        .attach('dataFile', 'test/img/img2.jpg')
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('File Size should not exceed 400KB');
          done();
        });
    });
  });

  describe('When a user tries to make a car ad with an invalid image type', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        state: 'new',
        price: 1200000,
        model: '2018',
        bodyType: 'coupe',
        manufacturer: 'maclaren',
      };


      chai.request(server)
        .post('/api/v1/car').set('Authorization', token)
        .field('Content-Type', 'multipart/form-data')
        .field(data)
        .attach('dataFile', 'test/img/song.mp3')
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Allowed File type [\'png\', \'jpg\', \'jpeg\', \'gif\']');
          done();
        });
    });
  });

  describe('When a user tries to upload a new car with valid detail', () => {
    // eslint-disable-next-line func-names
    it('should return an object with the status and data', function (done) {
      this.timeout(50000);
      const data = {
        state: 'new',
        price: 1200000,
        model: '2018',
        bodyType: 'coupe',
        manufacturer: 'maclaren',
      };


      chai.request(server)
        .post('/api/v1/car').set('Authorization', token)
        .field('Content-Type', 'multipart/form-data')
        .field(data)
        .attach('dataFile', 'test/img/img1.jpg')
        .type('form')
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(201);
          expect(res.body).to.have.property('data').to.be.a('object');
          expect(res.body).to.have.property('data').to.have.property('id');
          expect(res.body).to.have.property('data').to.have.property('owner');
          expect(res.body).to.have.property('data').to.have.property('createdOn');
          expect(res.body).to.have.property('data').to.have.property('state');
          expect(res.body).to.have.property('data').to.have.property('status').to.be.equals('available');
          expect(res.body).to.have.property('data').to.have.property('price');
          expect(res.body).to.have.property('data').to.have.property('manufacturer');
          expect(res.body).to.have.property('data').to.have.property('model');
          expect(res.body).to.have.property('data').to.have.property('bodyType');
          expect(res.body).to.have.property('data').to.have.property('url');
          done();
        });
    });
  });
});
