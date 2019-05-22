import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
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
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('User Account does not exist');
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
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Invalid Password');
          done();
        });
    });
  });

  describe('When a User logs in with acceptable detail', () => {
    it('should return an object with the status and data', (done) => {
      const user = {
        email: 'augsomto@gmail.com', password: 'passwoh6rd54',
      };

      chai.request(server)
        .post('/api/v1/auth/signin')
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


describe('POST /api/v1/order', () => {
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

  describe('When a user tries to make a purchase order for a car id that does not exist', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        carId: 900,
        amount: 1400000,
      };


      chai.request(server)
        .post('/api/v1/order').set('Authorization', token)
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Car id does not exist');
          done();
        });
    });
  });
  describe('When a user tries to make a purchase order with a non positive integer price', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        carId: 2,
        amount: 'amaobi',
      };


      chai.request(server)
        .post('/api/v1/order').set('Authorization', token)
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Price must be a positive integer');
          done();
        });
    });
  });
  describe('When a user tries to make a purchase order with no car id', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        amount: 1400000,
      };


      chai.request(server)
        .post('/api/v1/order').set('Authorization', token)
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('No car id supplied');
          done();
        });
    });
  });

  describe('When a user tries to make a purchase order with a non positive integer car id', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        carId: 'ama',
        amount: 1400000,
      };


      chai.request(server)
        .post('/api/v1/order').set('Authorization', token)
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Car id must be a positive integer');
          done();
        });
    });
  });

  describe('When a user tries to make a purchase order with no amount', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        carId: 2,
      };


      chai.request(server)
        .post('/api/v1/order').set('Authorization', token)
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Price is not supplied');
          done();
        });
    });
  });

  describe('When a user tries to make a purchase order from user\'s posted adv', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        carId: 1,
        amount: 1290598,
      };


      chai.request(server)
        .post('/api/v1/order').set('Authorization', token)
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('You cannot make a purchase order for your stock');
          done();
        });
    });
  });

  describe('When a user tries to make a purchase order that already exists', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        carId: 3,
        amount: 1290598,
      };


      chai.request(server)
        .post('/api/v1/order').set('Authorization', token)
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(400);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Purchase Order already exists');
          done();
        });
    });
  });

  describe('When a user tries to make a purchase order with valid detail', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        carId: 6,
        amount: 1400000,
      };


      chai.request(server)
        .post('/api/v1/order').set('Authorization', token)
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(201);
          expect(res.body).to.have.property('data').to.be.a('object');
          expect(res.body).to.have.property('data').to.have.property('id');
          expect(res.body).to.have.property('data').to.have.property('carId');
          expect(res.body).to.have.property('data').to.have.property('createdOn');
          expect(res.body).to.have.property('data').to.have.property('priceOffered');
          expect(res.body).to.have.property('data').to.have.property('price');
          expect(res.body).to.have.property('data').to.have.property('buyer');
          done();
        });
    });
  });
});


describe('When user tries to access the application using wrong token', () => {
  const userCredentials = {
    email: 'aobikobe@gmail.com',
    password: 'password70',
  };
  const authenticatedUser = request.agent(server);
  before((done) => {
    authenticatedUser
      .post('/api/v1/auth/signin')
      .send(userCredentials)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        // token = `Bearer ${res.body.data.token}`;
        done();
      });
  });

  describe('When a user tries to make a with no token validation', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        carId: 2,
        amount: 1400000,
      };


      chai.request(server)
        .post('/api/v1/order')
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(403);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Forbidden');
          done();
        });
    });
  });

  describe('When a user tries to make a with a wrong token', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        carId: 2,
        amount: 1400000,
      };


      chai.request(server)
        .post('/api/v1/order').set('Authorization', 'amaobi')
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').to.equals(403);
          expect(res.body).to.have.property('error').to.be.a('string').equals('Forbidden');
          done();
        });
    });
  });
});
