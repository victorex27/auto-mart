import { validationResult } from 'express-validator/check';

class Validator {
  static validate(req, res) {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return '';
    }
    const error = errors.array()[0].msg;

    return res.status(400).json({ status: 400, error });
  }
}

export default Validator;
