import userData from './data/user';

class User {
  constructor() {
    this.users = userData;
    this.lastInsertId = this.users.length;
  }


  create(data) {
    if (this.doesUserExist(data.email)) {
      return { code: 400, error: 'User Account already exists' };
    }

    const newId = this.lastInsertId + 1;
    this.lastInsertId = newId;
    const newUser = {
      id: newId,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      address: data.address,
      isAdmin: false,
    };
    this.users.push(newUser);
    return newUser;
  }

  signIn(data) {
    if (!this.doesUserExist(data.email)) {
      return { code: 404, error: 'Invalid Username and Password combination' };
    }
    const user = this.doCredentailsMatch(data.email, data.password);

    if (!user) {
      return { code: 401, error: 'Invalid Username and Password combination' };
    }

    return user;
  }

  doesUserExist(email) {
    return this.users.find(user => user.email === email);
  }

  doCredentailsMatch(email, password) {
    return this.users.find(user => user.email === email && user.password === password);
  }
}
export default new User();
