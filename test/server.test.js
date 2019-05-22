import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';


use(chaiHttp);


describe('POST /api/v1/auth/signup', () => {
  describe('When a new User Signs Up with an Email account that already exists', () => {
    it('should return an error status', (done) => {
      const user = {
        email: 'aobikobe@gmail.com', firstName: 'Amaobi', lastName: 'Obikobe', password: 'paswword54', address: '30,ijoko road, sango ota, ogun state',
      };

      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('User Account already exists');
          done();
        });
    });
  });

  describe('When a new User Signs up with no email address supplied', () => {
    it('should return an error status', (done) => {
      const user = {
        email: '', firstName: 'Amaobi', lastName: 'Obikobe', password: 'paswword54', address: '30,ijoko road, sango ota, ogun state',
      };

      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Email Field cannot be empty');
          done();
        });
    });
  });
  describe('When a new User Signs Up with an invalid email type', () => {
    it('should return an error status', (done) => {
      const user = {
        email: 'amaobi', firstName: 'Amaobi', lastName: 'Obikobe', password: 'paswword54', address: '30,ijoko road, sango ota, ogun state',
      };

      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Invalid Email Format');
          done();
        });
    });
  });

  describe('When a new User Signs Up with a password less than 6 char', () => {
    it('should return an error status', (done) => {
      const user = {
        email: 'aobikobe1@gmail.com', firstName: 'Amaobi', lastName: 'Obikobe', password: 'pasww', address: '30,ijoko road, sango ota, ogun state',
      };

      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Password must be between 6 to 40 characters');
          done();
        });
    });
  });

  describe('When a new User Signs Up with a password that does not contain at least a number', () => {
    it('should return an error status', (done) => {
      const user = {
        email: 'aobikobe1@gmail.com', firstName: 'Amaobi', lastName: 'Obikobe', password: 'paswword', address: '30,ijoko road, sango ota, ogun state',
      };

      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Password Field must contain at least one number');
          done();
        });
    });
  });

  describe('When a new User Signs Up with a password that does not contain at least an alphabet', () => {
    it('should return an error status', (done) => {
      const user = {
        email: 'aobikobe1@gmail.com', firstName: 'Amaobi', lastName: 'Obikobe', password: '12345678', address: '30,ijoko road, sango ota, ogun state',
      };

      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Password Field must contain at least an alphabet');
          done();
        });
    });
  });

  describe('When a new User Signs Up with no firstname ', () => {
    it('should return an object with the status and error', (done) => {
      const user = {
        email: 'aobikobe1@gmail.com', firstName: '', lastName: 'Obikobe', password: 'password65', address: '30,ijoko road, sango ota, ogun state',
      };

      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('First Name Field cannot be empty');
          done();
        });
    });
  });
  describe('When a new User Signs Up with no lastname ', () => {
    it('should return an object with the status and error', (done) => {
      const user = {
        email: 'aobikobe1@gmail.com', firstName: 'Amaobi', lastName: '', password: 'password54', address: '30,ijoko road, sango ota, ogun state',
      };

      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Last Name Field cannot be empty');
          done();
        });
    });
  });

  describe('When a new User Signs Up with an empty address field ', () => {
    it('should return an object with the status and error', (done) => {
      const user = {
        email: 'aobikobe11@gmail.com', firstName: 'Amaobi', lastName: 'Victor', password: 'password54', address: '',
      };

      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Address Field cannot be empty');
          done();
        });
    });
  });

  describe('When a new User Signs Up with no email field ', () => {
    it('should return an object with the status and error', (done) => {
      const user = {
        firstName: 'Amaobi', lastName: 'Victor', password: 'password54', address: '',
      };

      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Email Field is missing');
          done();
        });
    });
  });

  describe('When a new User Signs Up with no first name field ', () => {
    it('should return an object with the status and error', (done) => {
      const user = {
        email: 'aobikobe11@gmail.com', lastName: 'Victor', password: 'password54', address: '',
      };

      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('First Name Field is missing');
          done();
        });
    });
  });

  describe('When a new User Signs Up with no last name field ', () => {
    it('should return an object with the status and error', (done) => {
      const user = {
        email: 'aobikobe11@gmail.com', firstName: 'Amaobi', password: 'password54', address: '',
      };

      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Last Name Field is missing');
          done();
        });
    });
  });

  describe('When a new User Signs Up with no password field ', () => {
    it('should return an object with the status and error', (done) => {
      const user = {
        email: 'aobikobe11@gmail.com', firstName: 'Amaobi', lastName: 'Victor', address: '',
      };

      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Password Field is missing');
          done();
        });
    });
  });

  describe('When a new User Signs Up with no address field ', () => {
    it('should return an object with the status and error', (done) => {
      const user = {
        email: 'aobikobe11@gmail.com', firstName: 'Amaobi', lastName: 'Victor', password: 'password54',
      };

      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Address Field is missing');
          done();
        });
    });
  });

  describe('When a new User Signs Up with an acceptable detail', () => {
    it('should return an object with the status and data', (done) => {
      const user = {
        email: 'augsomto@gmail.com', firstName: 'Amaobi', lastName: 'Obikobe', password: 'passwoh6rd54', address: '30,ijoko road, sango ota, ogun state',
      };

      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(201);
          expect(res.body).to.have.property('data').to.be.a('object');
          expect(res.body).to.have.property('data').to.have.property('token');
          expect(res.body).to.have.property('data').to.have.property('email');
          expect(res.body).to.have.property('data').to.have.property('firstName');
          expect(res.body).to.have.property('data').to.have.property('lastName');
          done();
        });
    });
  });
});
