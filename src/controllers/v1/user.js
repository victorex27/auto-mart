import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator/check';
import UserService from '../../services/controller/v1/user';


class User {
  static async create(req, res) {
    const newUser = await UserService.create(req.body);

    const result = Promise.resolve(newUser);


    result.then(
      user => User.getUser(req, res, user, 201),
    ).catch(() => {});
  }

  static signIn(req, res) {
    const newUser = UserService.signIn(req.body);


    const result = Promise.resolve(newUser);


    result.then(
      user => User.getUser(req, res, user, 200),
    );
  }

  static getUser(req, res, userModel, status) {
    const errors = validationResult(req);


    if (!errors.isEmpty()) {
      const error = errors.array();
      return res.status(400).json({ status: 400, error: error[0].msg });
    }

    if (userModel.error) {
      return res.status(400).json({ status: userModel.code, error: userModel.error });
    }

    const token = jwt.sign({ id: userModel.id, email: userModel.email, isAdmin: userModel.isAdmin }, process.env.YOUR_SECRET_KEY, { expiresIn: '2h' });

    return res.status(status).json({ status, data: { token, ...userModel } });
  }
}

export default User;
