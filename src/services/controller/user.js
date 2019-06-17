import bcryptjs from 'bcryptjs';
import { query } from '../db';


class UserService {
  static async create(data) {
    const doesUserExistPromise = UserService.doesUserExist(data.email);

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
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            isAdmin: false,
          }),
        );
      },
    );
  }


  static async createUser(data) {
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(data.password, salt);
    const { rows } = await query('INSERT INTO users (email,password,first_name,last_name,address,is_admin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;',
      [data.email,
        hash,
        data.firstName,
        data.lastName,
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
}
export default UserService;
