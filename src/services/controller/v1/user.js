import bcryptjs from 'bcryptjs';
import { query } from '../../db';


class UserService {
  static async create(data) {
    const doesUserExistPromise = UserService.doesUserExist(data.email);
    const firstName = data.first_name;
    const lastName = data.last_name;
    return doesUserExistPromise.then(
      (userExists) => {
        if (userExists) {
          return { code: 400, error: 'User Account already exists' };
        }

        const createUserPromise = UserService.createUser(data);
        return createUserPromise.then(
          id => ({
            id,
            email: data.email,
            first_name: firstName,
            last_name: lastName,
            address: data.address,
            is_admin: false,
          }),
        );
      },
    );
  }

  static async signIn(data) {
    const doesUserExistPromise = UserService.doesUserExist(data.email);

    return doesUserExistPromise.then(
      (userExists) => {
        if (!userExists) {
          return { code: 404, error: 'Invalid Username and Password combination' };
        }
        const retrieveUserPromise = UserService.doCredentailsMatch(data.email, data.password);

        return retrieveUserPromise.then(
          obj => obj,
        );
      },
    );
  }

  static async createUser(data) {
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(data.password, salt);
    const firstName = data.first_name;
    const lastName = data.last_name;
    const { rows } = await query('INSERT INTO users (email,password,first_name,last_name,address,is_admin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;',
      [data.email,
        hash,
        firstName,
        lastName,
        data.address,
        false,
      ]);

    return rows[0].id;
  }

  static async doesUserExist(email) {
    const { rows } = await query('SELECT id FROM users WHERE email= $1;', [email]);

    if (rows.length === 1) {
      return true;
    }
    return false;
  }

  static async doCredentailsMatch(email, password) {
    const text = 'SELECT * FROM users WHERE email = $1';
    const value = [email];
    const { rows } = await query(text, value);


    const result = bcryptjs.compareSync(password, rows[0].password);

    if (!result) return { code: 401, error: 'Invalid Username and Password combination' };
    return {
      id: rows[0].id,
      email: rows[0].email,
      first_name: rows[0].first_name,
      last_name: rows[0].last_name,
      address: rows[0].address,
      is_admin: rows[0].is_admin,
    };
  }
}
export default UserService;
