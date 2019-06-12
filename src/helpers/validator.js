import { validationResult } from 'express-validator/check';

class Validator {
  static validate(req, res, status = 400) {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return '';
    }
    const error = errors.array()[0].msg;

    return res.status(status).json({ status, error });
  }
}

export default Validator;
