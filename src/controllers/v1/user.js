import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator/check';
import UserModel from '../../models/user';


class User {
  static create(req, res) {
    const newUser = UserModel.create(req.body);

    User.getUser(req, res, newUser, 201);
  }

  static signIn(req, res) {
    const newUser = UserModel.signIn(req.body);

    User.getUser(req, res, newUser, 200);
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