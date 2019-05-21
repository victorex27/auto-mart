import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator/check';
import UserModel from '../models/user';


class User {
  static create(req, res) {
    const errors = validationResult(req);
    const newUser = UserModel.create(req.body);

    if (!errors.isEmpty()) {
      const error = errors.array();
      return res.status(404).json({ status: 404, error: error[0].msg });
    }

    if (newUser.error) {
      return res.status(403).json({ status: 403, error: newUser.error });
    }


    const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.YOUR_SECRET_KEY, { expiresIn: '1h' });

    return res.status(201).json({ status: 201, data: { token, ...newUser } });
  }
}

export default User;
