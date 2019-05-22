class User {
  constructor() {
    this.users = [{
      id: 1,
      email: 'aobikobe@gmail.com',
      firstName: 'Amaobi',
      lastName: 'Obikobe',
      password: 'password70',
      address: ' 33 kwaru family way , Lagos',
      isAdmin: true,
    },
    {
      id: 2,
      email: 'mikenit90@gmail.com',
      firstName: 'Arinze',
      lastName: 'Obikobe',
      password: 'password70',
      address: ' 40 Owerri west, owerri',
      isAdmin: false,
    },
    {
      id: 3,
      email: 'victorex27@hotmail.com',
      firstName: 'Ekene',
      lastName: 'Obikobe',
      password: 'password70',
      address: '50 abuloma, port harcourt, rivers',
      isAdmin: false,
    }, {
      id: 4,
      email: 'victorvents@hotmail.com',
      firstName: 'Emenike',
      lastName: 'Obikobe',
      password: 'password70',
      address: '16 udo udoma, by abak road, akwa ibom',
      isAdmin: false,
    },
    ];
    this.lastInsertId = this.users.length;
  }


  create(data) {
    if (this.doesUserExist(data.email)) {
      return { error: 'User Account already exists' };
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
      return { error: 'User Account does not exist' };
    }
    const user = this.doCredentailsMatch(data.email, data.password);

    if (!user) {
      return { error: 'Invalid Password' };
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
